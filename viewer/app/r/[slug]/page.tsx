import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";

import { ReportViewer } from "../../../components/report-viewer";
import { getPublicReportBySlug, isValidReportSlug } from "../../../lib/report-data";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

const getCachedReport = cache(getPublicReportBySlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidReportSlug(slug)) {
    return { title: "Report Not Found | Should I Build This?" };
  }

  const report = await getCachedReport(slug);
  if (!report) {
    return { title: "Report Not Found | Should I Build This?" };
  }

  return {
    title: `${report.shared.title} | Should I Build This?`,
    description: report.shared.description,
  };
}

export default async function ReportPage({ params }: Props) {
  const { slug } = await params;
  if (!isValidReportSlug(slug)) {
    notFound();
  }

  const report = await getCachedReport(slug);
  if (!report) {
    notFound();
  }

  return <ReportViewer report={report} />;
}
