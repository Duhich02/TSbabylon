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
import { useStore } from 'vuex';


// enum GizmoType{
//   Position,
//   Rotation,
//   Scaling
// }
//todo counter clicker in dev
export class EditorScene {
  canvas: HTMLCanvasElement;
  scene: Scene;
  engine: Engine;
  selectionMaterial: StandardMaterial;
  unselectedMaterial: StandardMaterial;
  selectedMesh: Nullable<AbstractMesh> = null;
  gizmoManager: Nullable<GizmoManager> = null;
  private mSkinny?: AbstractMesh; // худой
  private mFat?: AbstractMesh; // жирный
  private mAthletic?: AbstractMesh; // накачанный
  private mNormal?: AbstractMesh; // обычное телосложение
  private mIsUpdatableVertecies: boolean;
  private mEngine: any;
  mCharacter?: AbstractMesh; // отредактированный
  paintedAthletic?: AbstractMesh; // раскрашенный атлет


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
    const camera = new FreeCamera("camera1", new Vector3(2, 1, -5), scene);
    camera.attachControl(this.canvas, true);
    const light = new HemisphericLight("light", new Vector3(0.0, 0.0, 1.0), scene);
    light.intensity = 0.5;
    const ground = MeshBuilder.CreateGround("ground", { width: 6, height: 4 }, scene);
    ground.position = new Vector3(0, -1, 0);
    const box = MeshBuilder.CreateBox("box", { size: 4 }, scene);
    box.position.z = 9;
    const box2 = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    const material = new StandardMaterial("box-material", scene);
    const secondMaterial = new StandardMaterial("box-material", scene);
    material.diffuseColor = Color3.Purple();
    secondMaterial.diffuseColor = Color3.Blue();
    box.material = material;
    box2.material = material;
    ground.material = secondMaterial;
    console.log("createScene")
    this.gizmoManager = new GizmoManager(scene);
    scene.onPointerDown = (evt, pickResult) => {
      if (pickResult?.hit && pickResult.pickedMesh instanceof AbstractMesh) {
        this.selectMesh(pickResult.pickedMesh);
        const utilityLayer = new UtilityLayerRenderer(scene);
        const positionGizmo = new PositionGizmo(utilityLayer);
        positionGizmo.attachedMesh = this.selectedMesh;
        const rotationGizmo = new RotationGizmo(utilityLayer);
        rotationGizmo.attachedMesh = this.selectedMesh;
        rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
        const scalingGizmo = new ScaleGizmo(utilityLayer);
        scalingGizmo.attachedMesh = this.selectedMesh;
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
      this.gizmoManager.positionGizmoEnabled = !this.gizmoManager.positionGizmoEnabled;
      console.log('togglePositionGizmo')
    }
  }
  public enableRotationGizmo() {
    if (this.gizmoManager) {
      this.gizmoManager.rotationGizmoEnabled = !this.gizmoManager.rotationGizmoEnabled;
      console.log('toggleRotationGizmo')
    }
  }
  public enableScaleGizmo() {
    if (this.gizmoManager) {
      this.gizmoManager.scaleGizmoEnabled = !this.gizmoManager.scaleGizmoEnabled;
      console.log('toggleScaleGizmo')
    }
  }

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
  private selectMesh(mesh: AbstractMesh) {
    if (mesh.material !== this.selectionMaterial) {
      if (this.selectedMesh && this.selectedMesh !== mesh) {
        this.selectedMesh.material = this.unselectedMaterial;
        console.log('selectMesh1')
      }
      this.selectedMesh = mesh;
      mesh.material = this.selectionMaterial;
      console.log('selectMesh2')
    }
  }
  private unselectMesh() {
    if (this.selectedMesh) {
      this.selectedMesh.material = this.unselectedMaterial;
      this.selectedMesh = null;
      console.log('unselectMesh')
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
    return new PointLight("New Point Light", Vector3.Zero(), this?.scene!);
  }

  public addDirectionalLight(): DirectionalLight {
    return new DirectionalLight("New Directional Light", new Vector3(-1, -2, -1), this?.scene!);
  }

  public addSpotLight(): SpotLight {
    return new SpotLight("New Spot Light", new Vector3(10, 10, 10), new Vector3(-1, -2, -1), Math.PI * 0.5, 1, this?.scene!);
  }

  public addHemisphericLight(): HemisphericLight {
    return new HemisphericLight("New Hemispheric Light", new Vector3(0, 1, 0), this.scene!);
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
  async build() {
    const paintedAthletic = await this.loadModel('arkaOnne.glb'); // обычное телосложение
    // this.mNormal.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    paintedAthletic.position = new Vector3(0, 0, 0);
    // this.paintedAthlet.scaling = new Vector3(0, 0, 0);

    this.mNormal = await this.loadModel('arkaTwo.glb'); // обычное телосложение
    // this.mNormal.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    this.mNormal.position = new Vector3(-4, 0, 0);
    this.mNormal.scaling = new Vector3(0, 0, 0);

    this.mAthletic = await this.loadModel('ceiling_600_600_01.glb'); // накачанный
    // this.mAthletic.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    this.mAthletic.position = new Vector3(-2, 0, 0);
    this.mAthletic.scaling = new Vector3(0, 0, 0);

    this.mCharacter = await this.loadModel('ceiling_600_600_02.glb'); // обычное телосложение
    // this.mCharacter.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    this.mCharacter.position = new Vector3(2, 0, 0);

    this.mSkinny = await this.loadModel('ceiling_600_600_03.glb'); // худой
    // this.mSkinny.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    this.mSkinny.position = new Vector3(2, 0, 0);
    this.mSkinny.scaling = new Vector3(0, 0, 0);

    this.mFat = await this.loadModel('ceiling_stones_01.glb'); // жирный
    // this.mFat.rotate(new Vector3(0, 1, 0), Math.PI, Space.LOCAL)
    this.mFat.position = new Vector3(4, 0, 0);
    this.mFat.scaling = new Vector3(0, 0, -0);

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

    this.mIsUpdatableVertecies = false;
  }

  // подгрузить модель персонажа
  async loadModel(inFilename: string) {
    const res = await SceneLoader.ImportMeshAsync(
      '',
      'assets/',
      inFilename,
      this.scene
    );

    const resMesh = res.meshes[0];
    return resMesh;
  }






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






