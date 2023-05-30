import {
  Engine,
  Mesh,
  GroundMesh,
  Scene,
  FreeCamera,
  Vector3,
  MeshBuilder,
  PointLight,
  DirectionalLight,
  SpotLight,
  Node,
  TransformNode,
  ParticleHelper,
  IParticleSystem,
  ArcRotateCamera,
  Texture,
  VertexData,
  ReflectionProbe,
  TargetCamera,
  StandardMaterial,
  Color3,
  HemisphericLight,
  Nullable,
  AbstractMesh,
} from "@babylonjs/core";
import { GizmoManager, PositionGizmo, RotationGizmo, ScaleGizmo } from "@babylonjs/core/Gizmos";
import { UtilityLayerRenderer } from "@babylonjs/core/Rendering/utilityLayerRenderer";
import { Tools } from "../components/Tools";

export class BasicScene {
  scene: Scene;
  engine: Engine;
  selectionMaterial: StandardMaterial;
  unselectedMaterial: StandardMaterial;
  selectedMesh: Nullable<AbstractMesh> = null;
  gizmoManager: Nullable<GizmoManager> = null;

  //TODO добавить переменные
//TODO один basicScene
  //TODO поменять названия на серьезные
  //todo sdf
  // TODO ctrl+w
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();
    this.selectionMaterial = new StandardMaterial(
      "selection-material",
      this.scene
    ); console.log('selectionMaterial')

    this.selectionMaterial.diffuseColor = Color3.Green();
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
    const camera = new FreeCamera("camera1", new Vector3(5, 5, -5), scene);
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

//можно слить в одну со switch
  //заменить toggle на enable
  //enums enum CardinalDirections {
  //   North,
  //   East,
  //   South,
  //   West
  // }
  public togglePositionGizmo() {
    if (this.gizmoManager) {
      this.gizmoManager.positionGizmoEnabled = !this.gizmoManager.positionGizmoEnabled;
      console.log('togglePositionGizmo')
    }
  }

  public toggleRotationGizmo() {
    if (this.gizmoManager) {
      this.gizmoManager.rotationGizmoEnabled = !this.gizmoManager.rotationGizmoEnabled;
      console.log('toggleRotationGizmo')
    }
  }

  public toggleScaleGizmo() {
    if (this.gizmoManager) {
      this.gizmoManager.scaleGizmoEnabled = !this.gizmoManager.scaleGizmoEnabled;
      console.log('toggleScaleGizmo')
    }
  }


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

//расправиться со static
  //только один basicScene
  public static addEmptyMesh(editor: BasicScene): Mesh {
    const mesh = new Mesh("New Empty Mesh", editor.scene!);
    return this.configureNode(mesh);
    //добавить скорее всего придется metadata
  }

  public static addCube(editor: BasicScene): Mesh {
    const cube = MeshBuilder.CreateBox("New Cube", { size: 4 }, editor.scene!);
    return this.configureNode(cube);
  }

  public static addSphere(editor: BasicScene): Mesh {
    const sphere = MeshBuilder.CreateSphere("New Sphere", { diameter: 2 }, editor.scene!);
    return this.configureNode(sphere);
  }

  public static addCylinder(editor: BasicScene): Mesh {
    const cylinder = MeshBuilder.CreateCylinder("New Cylinder", { height: 1, diameterTop: 1, diameterBottom: 1, tessellation: 16 }, editor.scene);
    return this.configureNode(cylinder);
  }

  public static addPlane(editor: BasicScene): Mesh {
    const plane = MeshBuilder.CreatePlane("New Plane", { size: 1 }, editor.scene);
    plane.rotation.x = Math.PI * 0.5;
    return this.configureNode(plane);
  }

  public static addGround(editor: BasicScene): GroundMesh {
    const ground = MeshBuilder.CreateGround("New Ground", { width: 512, height: 512, subdivisions: 32 }, editor.scene) as GroundMesh;
    return this.configureNode(ground);
  }

  public static addPointLight(editor: BasicScene): PointLight {
    return this.configureNode(new PointLight("New Point Light", Vector3.Zero(), editor.scene!));
  }

  public static addDirectionalLight(editor: BasicScene): DirectionalLight {
    return this.configureNode(new DirectionalLight("New Directional Light", new Vector3(-1, -2, -1), editor.scene!));
  }

  public static addSpotLight(editor: BasicScene): SpotLight {
    return this.configureNode(new SpotLight("New Spot Light", new Vector3(10, 10, 10), new Vector3(-1, -2, -1), Math.PI * 0.5, 1, editor.scene!));
  }

  public static addHemisphericLight(editor: BasicScene): HemisphericLight {
    return this.configureNode(new HemisphericLight("New Hemispheric Light", new Vector3(0, 1, 0), editor.scene!));
  }

  public static addFreeCamera(editor: BasicScene): FreeCamera {
    return this.configureNode(new FreeCamera("New Free Camera", editor.scene!.activeCamera!.position.clone(), editor.scene!, false));
  }

  public static addArcRotateCamera(editor: BasicScene): ArcRotateCamera {
    return this.configureNode(new ArcRotateCamera("New Arc Rotate Camera", 0, 0, 10, Vector3.Zero(), editor.scene!, false));
  }

  public static addTargetCamera(editor: BasicScene): TargetCamera {
    return this.configureNode(new TargetCamera("New Target Camera", Vector3.Zero(), editor.scene!));
  }




  private static configureNode<T extends Node>(node: T): T {
    node.id = Tools.RandomId();
    return node;
  }
}





