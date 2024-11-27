import prisma from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>; // Keep as a Promise
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params; // Await params to access its properties

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
