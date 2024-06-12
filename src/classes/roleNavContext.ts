import { useRouter } from "next/navigation";
import { AdminState } from "@/classes/adminState";
import { TrainingState } from "@/classes/trainingState";
import { ExaminationState } from "@/classes/examinationState";
import { GuestState } from "@/classes/guestState";

export class RoleNavContext {
  private state: RoleState;

  constructor(private router: ReturnType<typeof useRouter>) {
    this.state = new GuestState();
  }

  ChangeState(state: RoleState): void {
    2;
    this.state = state;
  }

  Navigate(role: string): void {
    switch (role) {
      case "ADMIN":
        this.ChangeState(new AdminState());
        break;
      case "DAOTAO":
        this.ChangeState(new TrainingState());
        break;
      case "KHAOTHI":
        this.ChangeState(new ExaminationState());
        break;
      default:
        this.ChangeState(new GuestState());
        break;
    }
    this.router.push(this.state.getUrl());
  }
}
