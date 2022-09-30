import { createGlobalStyle } from 'styled-components/macro';
import {
  //AssetManagerContext,
  AssetManagerContextProvider,
  Engine,
  Scene,
  Task,
  TaskType,
  useAssetManager,
  //useBeforeRender,
} from 'react-babylonjs';
import '@babylonjs/loaders';
import React, {
  Suspense,
  //useContext,
  //useRef
} from 'react';
import {
  //Mesh,
  MeshAssetTask,
  Vector3,
} from '@babylonjs/core';
const GlobalStyle = createGlobalStyle`
  html,body,#root{
    box-sizing:border-box;
    margin:0;
    padding:0;
    height:100%;
  }
  body{
    padding:10px;
  }
`;
export const App: React.FC = () => (
  <>
    <GlobalStyle />
    <MyScene />
  </>
);

const assetTask: Task[] = [
  // {
  //   taskType: TaskType.Mesh,
  //   rootUrl: `${baseUrl}BoomBox/glTF/`,
  //   sceneFilename: 'BoomBox.gltf',
  //   name: 'boombox',
  // },
  {
    taskType: TaskType.Mesh,
    rootUrl: `https://raw.githubusercontent.com/SunDawning/javascript-LittlestTokyo/master/`,
    sceneFilename: 'LittlestTokyo.glb',
    name: 'lt',
  },
];
const MyModels = () => {
  const assetManagerResult = useAssetManager(assetTask);

  React.useEffect(() => {
    console.log('Loaded Tasks', assetManagerResult);
    const ltTask = assetManagerResult.taskNameMap['lt'] as MeshAssetTask;

    console.log(ltTask);
    ltTask.loadedMeshes[0].position = new Vector3(-30, 0, 0);
    // ltTask.loadedMeshes[1].scaling = new Vector3(20, 20, 20);

    // const avocadoTask = assetManagerResult.taskNameMap['avocado'];
    // avocadoTask.loadedMeshes[0].position = new Vector3(-2.5, 0, 0);
    // avocadoTask.loadedMeshes[1].scaling = new Vector3(20, 20, 20);
  }, [assetManagerResult]);

  return null;
};

const MyScene = () => {
  return (
    <Engine
      width="100%"
      height="100%"
      antialias
      adaptToDeviceRatio
      canvasId="babylonJS"
    >
      <Scene>
        <arcRotateCamera
          name="camera1"
          alpha={(7 * Math.PI) / 4}
          beta={Math.PI / 2}
          radius={1000}
          target={Vector3.Zero()}
          //minZ={1}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <AssetManagerContextProvider>
          <Suspense fallback={<MyFallback />}>
            <MyModels />
          </Suspense>
        </AssetManagerContextProvider>
      </Scene>
    </Engine>
  );
};

const MyFallback = () => {
  //const boxRef = useRef<Mesh>(null);
  // const context = useContext(AssetManagerContext);
  // console.log('context in fallback:', context);

  // useBeforeRender((scene) => {
  //   if (boxRef.current) {
  //     var deltaTimeInMillis = scene.getEngine().getDeltaTime();

  //     const rpm = 10;
  //     boxRef.current.rotation.x = Math.PI / 4;
  //     boxRef.current.rotation.y +=
  //       (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  //   }
  // });

  //const eventData = context?.lastProgress?.eventData;

  return (
    <>
      <adtFullscreenUi name="ui">
        <rectangle name="rect" height="50px" width="150px">
          <rectangle>
            <textBlock
              text={`Loading`}
              fontStyle="bold"
              fontSize={20}
              color="white"
            />
          </rectangle>
        </rectangle>
      </adtFullscreenUi>
    </>
  );
};
