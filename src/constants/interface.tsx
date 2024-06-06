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
interface Papers {
  id: string;
  student: string;
  subject: string;
  numOfPage: number;
  score: number;
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
interface std {
  fullName: string;
  numberId: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  placeOfBirth: string;
  ethnicType: string;
  houseHold: string;
  address: string;
  school: string;
}
interface ExamRoomManageForm {
  id: string;
  room: string;
  subject: string;
  date: string;
}

interface Account {
  username: string;
  accountName: string;
  password: string;
  role: string;
}

interface ExamManageForm {
  id: string;
  examRoomId: string;
  subjectId: string;
  numberOfPapers: number;
}

interface ScoreManageForm {
  paperCode: string;
  studentCode: string;
  studentName: string;
  subject: string;
  date: string;
  score: number;
}

interface SubjectSets {
  id: string;
  name: string; // Tên tổ hợp môn học
  subjectList: string[]; // Danh sách các môn học trong tổ hợp
}

interface Subject {
  id: string;
  name: string;
  parameter: string;
  time: string;
}
interface Exam {
  id: string;
  name: string;
  year: string;
}
interface Benchmark {
  id: string;
  exam: string;
  class: string;
  score: number;
}
interface Class {
  id: string;
  name: string;
  year: string;
  quotas: number;
}

interface Room {
  id: string;
  name: string;
  maxContain: number;
}

interface PaperContainer {
  id: string;
  numberOfPapers: number;
  subject: string;
}

interface ExamRoomDetail {
  student: Student;
  examRoom: ExamRoomManageForm;
}

interface Paper {
  id: string;
  score: number;
  subject: string;
  student: string;
}
