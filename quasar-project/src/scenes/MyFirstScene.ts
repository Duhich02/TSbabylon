import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  HemisphericLight,
  Nullable,
  AbstractMesh,
  UtilityLayerRenderer,
} from "@babylonjs/core";
import {
  GizmoManager,
  RotationGizmo,
  ScaleGizmo,
  PositionGizmo,
} from "@babylonjs/core/Gizmos";

export class BasicScene {
  scene: Scene;
  engine: Engine;
  selectionMaterial: StandardMaterial;
  unselectedMaterial: StandardMaterial;
  selectedMesh: Nullable<AbstractMesh> = null;
  positionGizmo: Nullable<PositionGizmo> = null;
  rotationGizmo: Nullable<RotationGizmo> = null;
  scaleGizmo: Nullable<ScaleGizmo> = null;

  enablePositionGizmo() {
    this.disableGizmos();
    if (this.selectedMesh) {
      const utilityLayer = new UtilityLayerRenderer(this.scene);
      this.positionGizmo = new PositionGizmo(utilityLayer);
      this.positionGizmo.attachedMesh = this.selectedMesh;
    }
  }

  enableRotationGizmo() {
    this.disableGizmos();
    if (this.selectedMesh) {
      const utilityLayer = new UtilityLayerRenderer(this.scene);
      this.rotationGizmo = new RotationGizmo(utilityLayer);
      this.rotationGizmo.attachedMesh = this.selectedMesh;
    }
  }

  enableScaleGizmo() {
    this.disableGizmos();
    if (this.selectedMesh) {
      const utilityLayer = new UtilityLayerRenderer(this.scene);
      this.scaleGizmo = new ScaleGizmo(utilityLayer);
      this.scaleGizmo.attachedMesh = this.selectedMesh;
    }
  }

  disablePositionGizmo() {
    if (this.positionGizmo) {
      this.positionGizmo.dispose();
      this.positionGizmo = null;
    }
  }

  disableRotationGizmo() {
    if (this.rotationGizmo) {
      this.rotationGizmo.dispose();
      this.rotationGizmo = null;
    }
  }

  disableScaleGizmo() {
    if (this.scaleGizmo) {
      this.scaleGizmo.dispose();
      this.scaleGizmo = null;
    }
  }

  disableGizmos() {
    this.disablePositionGizmo();
    this.disableRotationGizmo();
    this.disableScaleGizmo();
  }
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.selectionMaterial = new StandardMaterial(
      "selection-material",
      this.scene
    );
    this.selectionMaterial.diffuseColor = Color3.Green();
    this.unselectedMaterial = new StandardMaterial(
      "unselected-material",
      this.scene
    );
    this.unselectedMaterial.diffuseColor = Color3.Purple();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera1", new Vector3(5, 5, -5), this.scene);
    camera.attachControl(this.canvas, true);
    const light = new HemisphericLight("light", new Vector3(0.0, 0.0, 1.0), this.scene);
    light.intensity = 0.5;
    const ground = MeshBuilder.CreateGround("ground", { width: 6, height: 4 }, this.scene);
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
    ground.material = secondMaterial
    // create GizmoManager instance and set usePointerToAttachGizmos to true
    const gizmoManager = new GizmoManager(scene);
    gizmoManager.usePointerToAttachGizmos = true;
    scene.onPointerDown = (evt, pickResult) => {
      if (pickResult?.hit && pickResult.pickedMesh instanceof AbstractMesh) {
        this.selectMesh(pickResult.pickedMesh);
        // create RotationGizmo instance and attach it to the selected mesh
        const utilityLayerRotate = new UtilityLayerRenderer(scene);
        const rotationGizmo = new RotationGizmo(utilityLayerRotate);
        rotationGizmo.attachedMesh = this.selectedMesh;
        // create ScalingGizmo instance and attach it to the selected mesh
        const utilityLayerScale = new UtilityLayerRenderer(scene);
        const scalingGizmo = new ScaleGizmo(utilityLayerScale);
        scalingGizmo.attachedMesh = this.selectedMesh;
      } else {
        this.unselectMesh();
      }
    };
    return scene;
  }
  selectMesh(mesh: AbstractMesh) {
    if (mesh.material !== this.selectionMaterial) {
      if (this.selectedMesh && this.selectedMesh !== mesh) {
        this.selectedMesh.material = this.unselectedMaterial;
      }
      this.selectedMesh = mesh;
      mesh.material = this.selectionMaterial;

      // create ScaleGizmo instance and attach it to the selected mesh
      const utilityLayer = new UtilityLayerRenderer(this.scene);
      const scaleGizmo = new ScaleGizmo(utilityLayer);
      scaleGizmo.attachedMesh = mesh;

      // create TranslationGizmo instance and attach it to the selected mesh
      const utilityLayerTranslate = new UtilityLayerRenderer(this.scene);
      const translationGizmo = new PositionGizmo(utilityLayerTranslate);
      translationGizmo.attachedMesh = mesh;
    }
  }
  unselectMesh() {
    if (this.selectedMesh) {
      this.selectedMesh.material = this.unselectedMaterial;
      this.selectedMesh = null;
    }
  }
}
