import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// const users = [
//   { id: 1, username: "john_doe", isStaff: true },
//   { id: 2, username: "jane_smith", isStaff: false },
//   { id: 3, username: "alice_wonder", isStaff: false },
// ];

type Prop={
    users :any
}

const UserTable = ({users} : Prop) => {
  return (
    <div className=" p-4 bg-themeBlack rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Is Staff</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user:any) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.isStaff ? "Yes" : "No"}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="destructive" size="sm">Ban</Button>
                <Button variant="outline" size="sm">Block</Button>
                <Button variant="default" size="sm">Make Staff</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
