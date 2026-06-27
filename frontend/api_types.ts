export {}

interface User { 
    id: number;
    name: string;
    email: string; 
}

interface ApiResponse { 
    data: User[];
    success: boolean;
    message?: string;
}

export interface Task {
    id: number;
    title: string;
    completed: ("pending" | "done" | "in-progress");
}

/* async function fetchUsers(): Promise<ApiResponse> {
    let response = await fetch('http://localhost:8000/api/users/');
    if(!response.ok) {
        throw new Error('Couldn\'t fetch Users');
    }
    return await response.json() as ApiResponse;
}

try {
    console.log(await fetchUsers());
} catch(e: any) {
    console.log(e.message);
} */
