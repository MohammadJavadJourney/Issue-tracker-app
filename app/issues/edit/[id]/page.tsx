import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormClient from "../../_components/IssueFormClient";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  try {
    const { id } = await params;

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });

    if (!issue) notFound();

    return <IssueFormClient issue={issue} />;
  } catch (error) {
    console.error("Error fetching issue:", error);
    notFound(); // or handle error more gracefully
  }
};

export default EditIssuePage;
