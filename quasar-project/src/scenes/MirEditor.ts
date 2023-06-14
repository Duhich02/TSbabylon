import {
  AbstractMesh,
  ArcRotateCamera,
  Color3,
  DirectionalLight,
  Engine,
  FreeCamera,
  GroundMesh,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Node,
  Nullable,
  PointLight,
  Scene, SceneLoader,
  SpotLight,
  StandardMaterial,
  TargetCamera,
  Vector3,
} from "@babylonjs/core";
import {GizmoManager, PositionGizmo, RotationGizmo, ScaleGizmo} from "@babylonjs/core/Gizmos";
import {UtilityLayerRenderer} from "@babylonjs/core/Rendering/utilityLayerRenderer";
import '@babylonjs/loaders';
import "@babylonjs/loaders/glTF";
import 'babylonjs-loaders';


// enum GizmoType{
//   Position,
//   Rotation,
//   Scaling
// }
//todo counter clicker in dev
//событие onChange, новые координаты
export class EditorScene {
  canvas: HTMLCanvasElement;
  scene: Scene;
  engine: Engine;
  selectionMaterial: StandardMaterial;
  unselectedMaterial: StandardMaterial;
  selectedMesh: Nullable<AbstractMesh> = null;
  gizmoManager: Nullable<GizmoManager> = null;
  utilityLayer: UtilityLayerRenderer;
  mSkinny?: AbstractMesh; // худой
  mFat?: AbstractMesh; // жирный
  mAthletic?: AbstractMesh; // накачанный
  mNormal?: AbstractMesh; // обычное телосложение
  mIsUpdatableVertecies: boolean;
  mCharacter?: AbstractMesh; // отредактированный
  paintedAthletic?: AbstractMesh; // раскрашенный атлет
  positionGizmo: any;
  rotationGizmo: any;
  scalingGizmo: any;




  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();
    this.selectionMaterial = new StandardMaterial(
      "selection-material",
      this.scene
    ); console.log('selectionMaterial')
    this.selectionMaterial.diffuseColor = Color3.Green();
    this.mIsUpdatableVertecies = false;
    this.utilityLayer = new UtilityLayerRenderer(this.scene);
    this.unselectedMaterial = new StandardMaterial(
      "unselected-material",
      this.scene
    ); console.log('unselectedMaterial')
    this.unselectedMaterial.diffuseColor = Color3.Purple();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  private createScene(): Scene {
    const scene = new Scene(this.engine);
    // const camera = new ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2, 12, new Vector3(0, 0, 0), scene);
    const camera = new FreeCamera("camera1", new Vector3(2, 1, -5), scene);
    camera.attachControl(this.canvas, true);
    // const light = new DirectionalLight("light", new Vector3(0.0, 0.0, 1.0), scene);
    // light.intensity = 0.5;
    const ground = MeshBuilder.CreateGround("ground", { width: 6, height: 4 }, scene);
    ground.position = new Vector3(2, -1, 1);
    const box2 = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    box2.position = new Vector3(2, 0, 1);
    const material = new StandardMaterial("box-material", scene);
    const secondMaterial = new StandardMaterial("box-material", scene);
    material.diffuseColor = Color3.Purple();
    secondMaterial.diffuseColor = Color3.Blue();
    box2.material = material;
    ground.material = secondMaterial;
    console.log("createScene")

    scene.onPointerDown = (evt, pickResult) => {
      if (pickResult?.hit && pickResult.pickedMesh instanceof AbstractMesh) {
        this.selectMesh(pickResult.pickedMesh);
        console.log('selectMesh in onPointerObservable')
      } else {
        console.log('unselectMesh')
        this.unselectMesh();
      }
    };
    return scene;
  }

  public enablePositionGizmo() {
    if (this.gizmoManager) {
      this.positionGizmo = new PositionGizmo(this.utilityLayer);
      this.rotationGizmo = null;
      this.scalingGizmo = null;
      this.positionGizmo.attachedMesh = this.selectedMesh;
      console.log('togglePositionGizmo')
      // this.gizmoManager.positionGizmoEnabled = false;
      // this.gizmoManager.rotationGizmoEnabled = false;
      // this.gizmoManager.scaleGizmoEnabled = false;
    }
  }
  public enableRotationGizmo() {
    if (this.gizmoManager) {
      this.rotationGizmo = new RotationGizmo(this.utilityLayer);
      this.positionGizmo = null;
      this.scalingGizmo = null;
      this.rotationGizmo.attachedMesh = this.selectedMesh;
      this.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
      console.log('toggleRotationGizmo')
    }
  }
  public enableScaleGizmo() {
    if (this.gizmoManager) {
      this.scalingGizmo = new ScaleGizmo(this.utilityLayer);
      this.positionGizmo = null;
      this.rotationGizmo = null;
      this.scalingGizmo.attachedMesh = this.selectedMesh;
      console.log('toggleScaleGizmo')
    }
  }


  public changePositionX(arc){
    if (this.selectedMesh) {
      this.selectedMesh.position.x = arc
    }
  }
  public changePositionY(arc){
    if (this.selectedMesh) {
      this.selectedMesh.position.y = arc
    }
  }
  public changePositionZ(arc){
    if (this.selectedMesh) {
      this.selectedMesh.position.z = arc
    }
  }
  public changeRotationX(arc){
    if (this.selectedMesh) {
      this.selectedMesh.rotation.x = arc
    }
  }
  public changeRotationY(arc){
    if (this.selectedMesh) {
      this.selectedMesh.rotation.y = arc
    }
  }
  public changeRotationZ(arc){
    if (this.selectedMesh) {
      this.selectedMesh.rotation.z = arc
    }
  }
  public changeScaleX(arc){
    if (this.selectedMesh) {
      this.selectedMesh.scaling.x = arc
    }
  }
  public changeScaleY(arc){
    if (this.selectedMesh) {
      this.selectedMesh.scaling.y = arc
    }
  }
  public changeScaleZ(arc){
    if (this.selectedMesh) {
      this.selectedMesh.scaling.z = arc
    }
  }


  public getSelectedObjectProperties(posX, posY, posZ, rotX, rotY, rotZ, ScaleX, ScaleY, ScaleZ){
      if (this.selectedMesh) {

        const posX = this.selectedMesh.position.x
        const posY = this.selectedMesh.position.y
        const posZ = this.selectedMesh.position.z

        const rotX = this.selectedMesh.rotation.x
        const rotY = this.selectedMesh.rotation.y
        const rotZ = this.selectedMesh.rotation.z

        const ScaleX = this.selectedMesh.scaling.x
        const ScaleY = this.selectedMesh.scaling.y
        const ScaleZ = this.selectedMesh.scaling.z

      }
  }


  // public objectTransformation(arc){
  //   if (this.selectedMesh) {
  //
  //     this.selectedMesh.position.x = arc
  //     this.selectedMesh.position.y = arc
  //     this.selectedMesh.position.z = arc
  //
  //     this.selectedMesh.rotation.x = arc
  //     this.selectedMesh.rotation.y = arc
  //     this.selectedMesh.rotation.z = arc
  //
  //     this.selectedMesh.scaling.x = arc
  //     this.selectedMesh.scaling.y = arc
  //     this.selectedMesh.scaling.z = arc
  //   }
  // }



// public enableGizmo(gizmoManager: GizmoManager, gizmoType: GizmoType) {
//     const gizmoEnabled = (property: keyof GizmoManager) => {
//       // @ts-ignore
//       gizmoManager[property] = !gizmoManager[property];
//       console.log(`toggle${property}`);
//     switch (gizmoType) {
//       case GizmoType.Position:
//         gizmoEnabled('positionGizmoEnabled');
//         break;
//       case GizmoType.Rotation:
//         gizmoEnabled('rotationGizmoEnabled');
//         break;
//       case GizmoType.Scaling:
//         gizmoEnabled('scaleGizmoEnabled');
//         break;
//     }
//   }
// }
  public selectMesh(mesh: AbstractMesh) {
    if (mesh.material !== this.selectionMaterial) {
      if (this.selectedMesh && this.selectedMesh !== mesh) {
        // this.selectedMesh.material = this.unselectedMaterial;
        console.log('selectMesh1')
      }
      this.selectedMesh = mesh;
      // mesh.material = this.selectionMaterial;
      console.log('selectMesh2')
      this.gizmoManager = new GizmoManager(this.scene);
    }
  }
  public unselectMesh() {
    if (this.selectedMesh) {
      // this.selectedMesh.material = this.unselectedMaterial;
      this.selectedMesh = null;
      console.log('unselectMesh')
      this.gizmoManager = null;
    }
  }

  public addEmptyMesh(): Mesh {
    console.log('emptyMeshIsAdded')
    return new Mesh("New Empty Mesh", this.scene!);
  }
  public addCube(): Mesh {
    return MeshBuilder.CreateBox("New Cube", {size: 3}, this.scene);
  }
  public addSphere(): Mesh {
    return MeshBuilder.CreateSphere("New Sphere", { diameter: 3 }, this.scene);
  }
  public addCylinder(): Mesh {
    return MeshBuilder.CreateCylinder("New Cylinder", { height: 3, diameterTop: 3, diameterBottom: 1, tessellation: 16 }, this.scene);
  }
  public addPlane(): Mesh {
    const plane = MeshBuilder.CreatePlane("New Plane", { size: 3 }, this?.scene);
    plane.rotation.x = Math.PI * 0.5;
    console.log("plane");
    return plane;
  }
  public addGround(): GroundMesh {
    return MeshBuilder.CreateGround("New Ground", { width: 512, height: 512, subdivisions: 32 }, this.scene) as GroundMesh;
  }

  public addPointLight(): PointLight {
    const pointLight = new PointLight("New Point Light", Vector3.Zero(), this?.scene!);
    const sphereLight = MeshBuilder.CreateSphere("sphere", { diameter: 0.3 }, this.scene);
    pointLight.parent = sphereLight;
    return pointLight;
  }

  public addDirectionalLight(): DirectionalLight {
    const directionalLight = new DirectionalLight("New Directional Light", new Vector3(-1, -2, -1), this?.scene!);
    const conusDirectionalLight = MeshBuilder.CreateCylinder("New Cylinder", { height: 0.3, diameterTop: 0.3, diameterBottom: 0.01, tessellation: 16 }, this.scene)
    conusDirectionalLight.rotation = new Vector3(0, 0, 1.5);
    directionalLight.parent = conusDirectionalLight;
    return directionalLight;
  }

  public addSpotLight(): SpotLight {
    const spotLight = new SpotLight("New Spot Light", new Vector3(10, 10, 10), new Vector3(-1, -2, -1), Math.PI * 0.5, 1, this?.scene!);
    const conusSpotLight = MeshBuilder.CreateCylinder("New Cylinder", { height: 0.3, diameterTop: 0.3, diameterBottom: 0.01, tessellation: 16 }, this.scene)
    conusSpotLight.rotation = new Vector3(0, 0, 1.5);
    spotLight.parent = conusSpotLight;
    return spotLight;
  }

  public addHemisphericLight(): HemisphericLight {
    const hemisphericLight = new HemisphericLight("New Hemispheric Light", new Vector3(0, 1, 0), this.scene!);
    const sphereHemisphericLight = MeshBuilder.CreateSphere("sphere", { diameter: 0.3 }, this.scene);
    hemisphericLight.parent = sphereHemisphericLight;
    return hemisphericLight;
  }

  public addFreeCamera(): FreeCamera {
    return new FreeCamera("New Free Camera", this.scene!.activeCamera!.position.clone(), this.scene!, false);
  }

  public addArcRotateCamera(): ArcRotateCamera {
    return new ArcRotateCamera("New Arc Rotate Camera", 0, 0, 10, Vector3.Zero(), this.scene!, false);
  }

  public addTargetCamera(): TargetCamera {
    return new TargetCamera("New Target Camera", Vector3.Zero(), this?.scene!);
  }


  // const ground = MeshBuilder.CreateGround("ground", { width: 6, height: 4 }, scene);
  // ground.position = new Vector3(0, -1, 0);


  // подгрузить и настроить модели персонажа
  public async TSaddObjectToScene(inFilename) {
    console.log('TSaddObjectToScene', inFilename)
    return await SceneLoader.ImportMeshAsync('','assets/', inFilename, this.scene);

    // const paintedAthletic = this.loadModel('arkaOnne.glb'); // обычное телосложение
    // // this.mNormal.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    // paintedAthletic.position = new Vector3(0, 0, 0);
    // // this.paintedAthlet.scaling = new Vector3(0, 0, 0);
    //
    // const mNormal = this.loadModel('arkaTwo.glb'); // обычное телосложение
    // // this.mNormal.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    // mNormal.position = new Vector3(-4, 0, 0);
    // mNormal.scaling = new Vector3(0, 0, 0);
    //
    // const mAthletic = this.loadModel('ceiling_600_600_01.glb'); // накачанный
    // // this.mAthletic.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    // mAthletic.position = new Vector3(-2, 0, 0);
    // mAthletic.scaling = new Vector3(0, 0, 0);
    //
    // const mCharacter = this.loadModel('ceiling_600_600_02.glb'); // обычное телосложение
    // // this.mCharacter.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    // mCharacter.position = new Vector3(2, 0, 0);
    //
    // const mSkinny = this.loadModel('ceiling_600_600_03.glb'); // худой
    // // this.mSkinny.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    // mSkinny.position = new Vector3(2, 0, 0);
    // mSkinny.scaling = new Vector3(0, 0, 0);
    //
    // const mFat = this.loadModel('ceiling_stones_01.glb'); // жирный
    // // this.mFat.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    // mFat.position = new Vector3(4, 0, 0);
    // mFat.scaling = new Vector3(0, 0, -0);

    // let uvs = this.mCharacter
    //   .getChildMeshes()[0]
    //   .getVerticesData(VertexBuffer.UVKind)
    // console.log('uvs', uvs)
    // for (let i = 0, len = uvs.length; i < len; i++) {
    //   if (uvs[i] > 1 || uvs[i] <= 0) {
    //     console.log(1, i)
    //     console.log(2, uvs[i])
    //   }
    // }

    // this.mIsUpdatableVertecies = false;
  }

  // подгрузить модель персонажа
  // public loadModel(inFilename: string) {
  //   const res = SceneLoader.ImportMeshAsync(
  //     '',
  //     'assets/',
  //     inFilename,
  //     this.scene
  //   );
  //
  //   const resMesh = res.meshes[0];
  //   return resMesh;
  // }






  // public addObjectToScene(editor: BasicScene): Mesh {
  //     BABYLON.SceneLoader.Append("scenes/BoomBox/", "BoomBox.gltf", this.scene, function (scene) {
  //     // Create a default arc rotate camera and light.
  //     scene.createDefaultCameraOrLight(true, true, true);
  //
  //     // The default camera looks at the back of the asset.
  //     // Rotate the camera by 180 degrees to the front of the asset.
  //     scene.activeCamera.alpha += Math.PI;
  //   });
  // }
}


// await build();






