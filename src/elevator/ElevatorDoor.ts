export default class ElevatorDoor {
  private openDoorTimeout?: NodeJS.Timeout;
  private closeDoorTimeout?: NodeJS.Timeout;
  private readonly motionTime: number = 3000;

  close(cb?: () => void) {
    if (this.closeDoorTimeout) {
      return;
    }

    if (this.openDoorTimeout) {
      clearTimeout(this.openDoorTimeout);
    }

    this.closeDoorTimeout = setTimeout(() => {
      if (cb) {
        cb();
      }

      this.closeDoorTimeout = undefined;
    }, this.motionTime);
  }

  open(cb?: () => void) {
    if (this.openDoorTimeout) {
      return;
    }

    if (this.closeDoorTimeout) {
      clearTimeout(this.closeDoorTimeout);
    }

    this.openDoorTimeout = setTimeout(() => {
      if (cb) {
        cb();
      }

      this.openDoorTimeout = undefined;
    }, this.motionTime);
  }
}
