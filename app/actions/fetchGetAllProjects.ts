'use server';

export {};

// const fetchGetAllProjects = async (userId: string): Promise<ActionResponse<Project[]>> => {
//   try {
//     await connectDB();
//     const projects = await ProjectModel.find({ userId });

//     if (!projects) {
//       console.error(msgs.project.getError);
//       return { status: 'error', error: msgs.project.getError };
//     }

//     return {
//       status: 'success',
//       data: projects.map((project: IProject) => ({
//         id: project._id ? project._id.toString() : '',
//         title: project.title,
//         userId: project.userId.toString(),
//       })) as Project[],
//     };
//   } catch (error) {
//     console.error(`${msgs.project.getError}:`, error as Error);
//     return { status: 'error', error: msgs.project.getError };
//   }
// };

// export default fetchGetAllProjects;
