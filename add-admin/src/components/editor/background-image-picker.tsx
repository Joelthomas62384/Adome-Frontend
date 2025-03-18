import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { EditorState } from "@/providers/editor/editor-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import { EditorAction } from "@/providers/editor/editor-action";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";


type Props = {
  state: EditorState;
  bgImage?: boolean
  id: string
  dispatch: React.Dispatch<EditorAction>
};

const BackgroundColorPicker = ({ dispatch, state, bgImage = false, id: PropId }: Props) => {

  //   const [background, setBackground] = useState<string>(state.editor.selectedElement.styles.backgroundColor || "#fffff" )
  const [color, setColor] = useState('')
 
  const [newColor, setnewColor] = useState(state.editor.selectedElement.styles.background || state.editor.selectedElement.styles.color)

  const handleColorChange = (newColor: string) => {
    console.log("clicked color: " + newColor);

    // setColor(newColor);
    // handleOnChanges({
    //   target: {
    //     name: "backgroundColor",
    //     value: newColor,
    //   },
    // });
    setnewColor(newColor)
    const styleObject = {
      [PropId]: newColor
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    })
  };


  const solids = [
    '#E2E2E2', '#ff75c3', '#ffa647', '#ffe83f', '#9fff5b', '#70e2ff', '#cd93ff', '#09203f',
    '#ff5733', '#c70039', '#900c3f', '#581845', '#1b1b2f', '#3282b8', '#0f4c75', '#bbe1fa',
    '#2ecc71', '#27ae60', '#f1c40f', '#e67e22', '#d35400', '#34495e', '#2c3e50', '#ecf0f1',
    '#95a5a6', '#7f8c8d', '#ffcc00', '#ff6699', '#cc66ff', '#66ccff','#ff4500', '#8b0000', '#ff1493', '#32cd32', '#008080',
  '#4682b4', '#bdb76b', '#ffdead', '#daa520', '#556b2f','#ff4444', '#ffbb33', '#00c851', '#33b5e5', '#aa66cc',
  '#ff6b81', '#ff9f43', '#5f27cd', '#54a0ff', '#10ac84'
  ];
  

  const gradients = [
    'linear-gradient(to top left, #accbee, #e7f0fd)',
    'linear-gradient(to top left, #d5d4d0, #eeeeec)',
    'linear-gradient(to top left, #000000, #434343)',
    'linear-gradient(to top left, #09203f, #537895)',
    'linear-gradient(to top left, #AC32E4, #7918F2, #4801FF)',
    'linear-gradient(to top left, #f953c6, #b91d73)',
    'linear-gradient(to top left, #ee0979, #ff6a00)',
    'linear-gradient(to top left, #F00000, #DC281E)',
    'linear-gradient(to top left, #00c6ff, #0072ff)',
    'linear-gradient(to top left, #4facfe, #00f2fe)',
    'linear-gradient(to top left, #0ba360, #3cba92)',
    'linear-gradient(to top left, #FDFC47, #24FE41)',
    'linear-gradient(to top left, #8a2be2, #0000cd, #228b22, #ccff00)',
    'linear-gradient(to top left, #40E0D0, #FF8C00, #FF0080)',
    'linear-gradient(to top left, #fcc5e4, #fda34b, #ff7882, #c8699e, #7046aa, #0c1db8, #020f75)',
    'linear-gradient(to top left, #ff75c3, #ffa647, #ffe83f, #9fff5b, #70e2ff, #cd93ff)',
    'linear-gradient(to right, #DAD299, #B0DAB9)',
    'linear-gradient(to right, #bdc3c7, #2c3e50)',       // 50 Shades of Grey
    'linear-gradient(to right, #2980B9, #6DD5FA, #FFFFFF)', // Cool Sky
    'linear-gradient(to right, #2774ae, #002E5D, #002E5D)',  // Dark Blue Gradient
    'linear-gradient(to right, #434343, #000000)',          // Premium Dark
    'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',  // Instagram
    'linear-gradient(to right, #b224ef, #7579ff)',           // Smart Indigo
    'linear-gradient(to right, #ed6ea0, #ec8c69)',           // Colorful Peach
    'linear-gradient(to right, #E3FDF5, #FFE6FA)',           // Perfect White
    'linear-gradient(to right, #ff9a9e, #fad0c4)',           // Peach Love
    'linear-gradient(to right, #ffdde1, #ee9ca7)',           // Sweet Pink
    'linear-gradient(to right, #ff758c, #ff7eb3)',           // Rosy Pink
    'linear-gradient(to right, #69ff97, #00e4ff)',           // Aqua Breeze
    'linear-gradient(to right, #fa709a, #fee140)',           // Sunset Glow
    'linear-gradient(to right, #a8edea, #fed6e3)',          // Soft Mint
    'linear-gradient(to right, #6a11cb, #2575fc)',          // Electric Violet
    'linear-gradient(to right, #ff6a00, #ee0979)',          // Flamingo Burst
    'linear-gradient(to right, #1e9600, #fff200, #ff0000)', // Traffic Light
    'linear-gradient(to right, #d53369, #cbad6d)',          // Cherry Wine
    'linear-gradient(to right, #1a2980, #26d0ce)',          // Deep Ocean
    'linear-gradient(to right, #360033, #0b8793)',          // Purple Haze
    'linear-gradient(to right, #ff512f, #dd2476)',          // Blood Orange
    'linear-gradient(to right, #1f4037, #99f2c8)',          // Jungle Mist
    'linear-gradient(to right, #4b6cb7, #182848)',          // Royal Blue
    'linear-gradient(to right, #de6262, #ffb88c)',          // Sunset Pink
    'linear-gradient(to right, #02aab0, #00cdac)',          // Seagreen Splash
    'linear-gradient(to right, #ffb347, #ffcc33)',          // Sunshine
  ];


  const images = [
    'url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90',
    'url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
  ]
  const [alpha, setAlpha] = useState(1)


  const hexToRgba = (hex: string, alpha: number) => {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  useEffect(() => {
    const newColor = hexToRgba(color, alpha)
    setnewColor(newColor)
    handleColorChange(newColor)
    console.log(newColor)
    console.log(PropId)

  }, [color, alpha])


  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="w-12  rounded border cursor-pointer"
          style={{
            background: newColor,
          }}
        />

      </PopoverTrigger>
      <PopoverContent className="w-60 max-h-96 overflow-y-auto p-4 flex flex-col gap-4">
        {/* <HexColorPicker color={color} onChange={handleColorChange} /> */}
        <Tabs defaultValue={'solid'} className="w-full">


          <TabsList className="w-full mb-4 sticky top-0">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            {(PropId==='background' || PropId==='backgroundColor') && <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>}
            <TabsTrigger className="flex-1" value="custom">
              Custom
            </TabsTrigger>
            {bgImage && <TabsTrigger className="flex-1" value="image">
              Image
            </TabsTrigger>}
          </TabsList>


          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => handleColorChange(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="flex flex-wrap gap-1 mb-2">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() => handleColorChange(s)}
                />
              ))}
            </div>


          </TabsContent>

          <TabsContent value="image" className="mt-0">
            <div className="grid grid-cols-2 gap-1 mb-2">
              {images.map((s) => (
                <div
                  key={s}
                  style={{ backgroundImage: s }}
                  className="rounded-md bg-cover bg-center h-12 w-full cursor-pointer active:scale-105"
                  onClick={() => handleColorChange(s)}
                />
              ))}
            </div>


          </TabsContent>

          <TabsContent value="custom">
            <HexColorPicker className="scale-75" color={color} onChange={setColor} />
            <Label className="text-muted-foreground">Opacity</Label>
            <Slider
              min={0}
              max={1}
              step={0.01}
              onValueChange={([val]) => setAlpha(val)}
              value={[alpha]}

            />
           
           


          </TabsContent>


        </Tabs>

      </PopoverContent>
    </Popover>
  );
};

export default BackgroundColorPicker;

