export default class ElevatorStatus {
  constructor(
    public readonly queue: number[],
    public readonly upQueue: number[],
    public readonly downQueue: number[],
    public readonly currentFloor: number,
    public readonly direction: string,
  ) {}
}
