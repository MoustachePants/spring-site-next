'use server';

export {};

// import { connectDB } from '@/lib/mongoConnection';

// const fetchCreateProject = async (
//   title: string,
//   userId: string,
//   categories: string[]
// ): Promise<ActionResponse<Project>> => {
//   try {
//     await connectDB();
//     const project = await ProjectModel.create({ title, userId });
//     if (!project) {
//       console.error(msgs.project.createError);
//       return { status: 'error', error: msgs.project.createError };
//     }

//     // initialize default categories
//     await Promise.all(categories.map((category) => fetchCreateCategory(category, project.id)));

//     return {
//       status: 'success',
//       data: {
//         id: project.id,
//         title: project.title,
//         userId: project.userId.toString(),
//         websites: [],// ?
//         categories: [],// ?
//         createdAt: project.createdAt,// ?
//         updatedAt: project.updatedAt,// ?
//       } as Project,
//     };
//   } catch (error) {
//     console.error(`${msgs.project.createError}:`, error as Error);
//     return { status: 'error', error: msgs.project.createError };
//   }
// };

// export default fetchCreateProject;
