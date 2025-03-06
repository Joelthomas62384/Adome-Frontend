import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getSubdomain, getTwoLetters } from "@/constants";
import { Role, UsersType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ban, Copy, Key, MoreHorizontal, MoreVertical, ShieldX, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TextCopyButton from "./text-copy";
import Assure from "@/components/global/Assure";
import axiosInstance from "@/axios/public-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";



export const columns: ColumnDef<UsersType>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const avatarUrl = row.original.user.profile_pic
            return (
                <div className="flex items-center gap-4">
                    <div className="h-11 w-11 relative flex-none">
                        <Avatar>
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{getTwoLetters(row.original.user.full_name)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <span>{row.original.user.full_name}</span>
                </div>
            )
        },
    },

    {
        header: "Email",
        cell: ({ row }) => <div className='font-bold flex items-center gap-3 '>
            {row.original.user.email}
            <TextCopyButton text={row.original.user.email} />
        </div>,
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
            const role: Role = row.getValue('role')
            return (
                <Badge
                    className={clsx({
                        'bg-green-300 ': role === 'admin',
                        'bg-orange-300': role === 'staff',
                        'bg-white   ': role === 'user',
                        'cursor-pointer': true
                    })}
                >
                    {role}
                </Badge>
            )
        },
    },
    {
        id: 'action',
        cell: ({ row }) => {
            return (
                <CallToAction rowData={row.original} />
            )
        }
    }
]


interface Props {
    rowData: UsersType
}
const CallToAction: React.FC<Props> = ({ rowData }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [banBlock, setBanBlock] = useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [staffData, setStaffData] = useState({
        is_staff: rowData.is_staff,

    })

    const banUser = async () => {
        const { data } = await axiosInstance.post(`user/${getSubdomain()}/ban/${rowData.user.username}`);
        return data;
    };

    const blockUser = async () => {
        const { data } = await axiosInstance.post(`user/${getSubdomain()}/block/${rowData.user.username}`);
        return data;
    };

    const banMutation = useMutation({
        mutationKey: ['banning'],
        mutationFn: banUser,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["users"] });
            toast({
                title: `User ${rowData.user.username} ${!rowData.banned ? "Unbanned" : "Banned"}`,
                description: !rowData.banned ? "User banned successfully" : "User unbanned successfully",
            });
            const previousUsers = queryClient.getQueryData(["users"]);
            queryClient.setQueryData(["users"], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        users: page.users.map((user: any) =>
                            user.username === rowData.user.username ? { ...user, banned: !user.banned } : user
                        ),
                    })),
                };
            });
            return { previousUsers };
        },
        onError: (err, newData, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(["users"], context.previousUsers);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const blockMutation = useMutation({
        mutationKey: ['blocking'],
        mutationFn: blockUser,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["users"] });
            toast({
                title: `User ${rowData.user.username} ${!rowData.blocked ? "Unblocked" : "Blocked"}`,
                description: !rowData.blocked ? "User blocked successfully" : "User unblocked successfully",
            });
            const previousUsers = queryClient.getQueryData(["users"]);
            queryClient.setQueryData(["users"], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        users: page.users.map((user: any) =>
                            user.username === rowData.user.username ? { ...user, blocked: !user.blocked } : user
                        ),
                    })),
                };
            });
            return { previousUsers };
        },
        onError: (err, newData, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(["users"], context.previousUsers);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const makeStaff = async (newStatus: boolean) => {
        return axiosInstance.patch(`user/${getSubdomain()}/tenantuser/${rowData.user.username}`, { is_staff: newStatus });
    };

    const updateUserMutation = useMutation({
        mutationFn: makeStaff,
        onMutate: async (newStatus) => {
            await queryClient.cancelQueries({ queryKey: ["users"] });
            toast({
                title: `User ${rowData.user.username} Updated`,
                description: "User Data updated successfully",
            });

            const previousUsers = queryClient.getQueryData(["users"]);

            queryClient.setQueryData(["users"], (oldData: any) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        users: page.users.map((user: any) =>
                            user.username === rowData.user.username
                                ? {
                                    ...user,
                                    is_staff: newStatus,
                                    role: newStatus ? "staff" : "user"
                                }
                                : user
                        ),
                    })),
                };
            });

            return { previousUsers };
        },
        onError: (err, newData, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(["users"], context.previousUsers);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });

        }
    });


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger disabled={rowData.role === "admin"} className="focus:outline-none">
                    <MoreVertical className={clsx({ "text-gray-600": rowData.role === "admin", "cursor-not-allowed": rowData.role === "admin" })} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-themeBlack">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Key color="#2563EB" /> Permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        setBanBlock("ban");
                    }}>
                        <Ban color="orange" /> {rowData.banned ? "Unban" : "Ban"}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => {
                        setBanBlock("block");
                    }}>
                        <StopCircle color="red" /> {rowData.blocked ? "Unblock" : "Block"}
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogContent className="bg-themeBlack">
                    <DialogHeader>
                        <DialogTitle>Edit {rowData.user.username}</DialogTitle>
                        <DialogDescription>Here you can edit the permissions of the user</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-between mt-4">
                        <Label className="text-white">Staff</Label>
                        <Switch checked={staffData.is_staff} onCheckedChange={(checked) => {
                            setStaffData({ ...staffData, is_staff: checked });

                            ;
                            updateUserMutation.mutate(checked);
                        }} />
                    </div>
                </DialogContent>
            </Dialog>

            <Assure open={!!banBlock} handleOpen={() => setBanBlock("")} description={banBlock === "block" ? "This action will block the user. User will be completely prohibited from the page." : "This action will ban the user, they will only be able to access things for which they have paid."} onConfirm={() => { banBlock === "block" ? blockMutation.mutate() : banMutation.mutate(); }} />
        </>
    );
};
