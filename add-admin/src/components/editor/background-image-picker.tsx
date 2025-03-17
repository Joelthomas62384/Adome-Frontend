import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { EditorState } from "@/providers/editor/editor-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import { EditorAction } from "@/providers/editor/editor-action";


type Props = {
  state: EditorState;
  bgImage? : boolean
  id : string
  dispatch : React.Dispatch<EditorAction>
};

const BackgroundColorPicker = ({ dispatch , state,bgImage=false ,id:PropId}: Props) => {

//   const [background, setBackground] = useState<string>(state.editor.selectedElement.styles.backgroundColor || "#fffff" )

  const handleColorChange = (newColor: string) => {
    console.log("clicked color: " + newColor);

    // setColor(newColor);
    // handleOnChanges({
    //   target: {
    //     name: "backgroundColor",
    //     value: newColor,
    //   },
    // });
    const styleObject = {
        [PropId] : newColor
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
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
  ]

  const gradients = [
    'linear-gradient(to top left, #accbee, #e7f0fd)',
    'linear-gradient(to top left, #d5d4d0, #d5d4d0, #eeeeec)',
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
    // Additional gradients from popular collections:
    'linear-gradient(to right, #bdc3c7, #2c3e50)',       // 50 Shades of Grey :contentReference[oaicite:0]{index=0}
    'linear-gradient(to right, #2980B9, #6DD5FA, #FFFFFF)', // Cool Sky :contentReference[oaicite:1]{index=1}
    'linear-gradient(to right, #2774ae, #002E5D, #002E5D)',  // Dark Blue Gradient :contentReference[oaicite:2]{index=2}
    'linear-gradient(to right, #434343, #000000)',          // Premium Dark :contentReference[oaicite:3]{index=3}
    'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',  // Instagram :contentReference[oaicite:4]{index=4}
    'linear-gradient(to right, #b224ef, #7579ff)',           // Smart Indigo :contentReference[oaicite:5]{index=5}
    'linear-gradient(to right, #ed6ea0, #ec8c69)',           // Colorful Peach :contentReference[oaicite:6]{index=6}
    'linear-gradient(to right, #E3FDF5, #FFE6FA)'            // Perfect White :contentReference[oaicite:7]{index=7}
  ];
  

  const images = [
    'url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90',
    'url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
  ]


  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="w-12  rounded border cursor-pointer"
          style={{
            background: state.editor.selectedElement.styles.background,
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
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
         { bgImage &&    <TabsTrigger className="flex-1" value="image">
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

         
          </Tabs>

      </PopoverContent>
    </Popover>
  );
};

export default BackgroundColorPicker;

