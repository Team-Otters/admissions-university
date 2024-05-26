interface Wish {
  id: string;
  name: string;
  priority: number;
}
interface Post {
  id: string;
  date: string;
  title: string;
  content: string;
}

interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  birth: string;
  gender: boolean;
  CCCD: string;
  financeStatus: boolean;
}

interface ExamRoomManageForm {
  roomCode: string;
  subjectName: string;
  roomName: string;
  date: string;
}

interface Account {
  username: string;
  accountName: string;
  password: string;
  role: string;
}
