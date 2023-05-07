import { Engine, Scene, FreeCamera, Vector3, MeshBuilder, StandardMaterial, Color3, HemisphericLight } from "@babylonjs/core";
// const createScene = (canvas) => {
export class BasicScene{
  scene: Scene;
  engine: Engine;
  constructor(private canvas:HTMLCanvasElement){
    this.engine = new Engine(this.canvas, true)
    this.scene = this.CreateScene()


    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

  }
  CreateScene():Scene{
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera1", new Vector3(5, 5, -5), this.scene);
    // camera.setTarget(Vector3.Zero());
    camera.attachControl(this.canvas, true); //mouse

    const light = new HemisphericLight("light", new Vector3(0.0, 0.0, 1.0), this.scene);
    light.intensity = 0.5;

    const ground = MeshBuilder.CreateGround("ground", { width: 4, height: 4 }, this.scene);

    const box = MeshBuilder.CreateBox("box", { size: 4 }, scene);
    box.position.z = 9;
    const box2 = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    const material = new StandardMaterial("box-material", scene);
    const groundMaterial = new StandardMaterial("box-material", scene);
    material.diffuseColor = Color3.Purple();
    groundMaterial.diffuseColor = Color3.Black();
    ground.material = groundMaterial
    box.material = material;
    box2.material = material;

    this.engine.runRenderLoop(() => {
      scene.render();
    });
    return scene;
  }
}
