export type Role = 'Employee' | 'Manager' | 'Admin';

export interface User {
  id: number;
  username: string;
  role: Role;
}

export interface Software {
  id: number;
  name: string;
  description: string;
  accessLevels: string[];
}

export interface AccessRequest {
  id: number;
  user: User;
  software: Software;
  accessType: 'Read' | 'Write' | 'Admin';
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
