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
} from "@babylonjs/core/Gizmos";


export class BasicScene {
  scene: Scene;
  engine: Engine;
  selectionMaterial: StandardMaterial;
  unselectedMaterial: StandardMaterial;
  selectedMesh: Nullable<AbstractMesh> = null;

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

    const box = MeshBuilder.CreateBox("box", { size: 4 }, scene);
    box.position.z = 9;
    const box2 = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    const material = new StandardMaterial("box-material", scene);
    const secondMaterial = new StandardMaterial("box-material", scene);
    material.diffuseColor = Color3.Purple();
    secondMaterial.diffuseColor = Color3.Black();
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
        const utilityLayer = new UtilityLayerRenderer(scene);
        const rotationGizmo = new RotationGizmo(utilityLayer);
        rotationGizmo.attachedMesh = this.selectedMesh;
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
    }
  }

  unselectMesh() {
    if (this.selectedMesh) {
      this.selectedMesh.material = this.unselectedMaterial;
      this.selectedMesh = null;
    }
  }
}
