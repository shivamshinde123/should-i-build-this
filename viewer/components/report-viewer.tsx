"use client";

import { useMemo, useState } from "react";

import {
  sanitizeReportText,
  toBuilderMetrics,
  toConcerns,
  toInvestorMetrics,
  toMarketSizeBars,
} from "../lib/report-format";
import type { PublicReport } from "../lib/report-types";

type ReportView = "builder" | "investor";

export function ReportViewer({ report }: { report: PublicReport }) {
  const [view, setView] = useState<ReportView>("builder");

  const builderMetrics = useMemo(() => toBuilderMetrics(report), [report]);
  const investorMetrics = useMemo(() => toInvestorMetrics(report), [report]);
  const concerns = useMemo(() => toConcerns(report), [report]);
  const bars = useMemo(() => toMarketSizeBars(report), [report]);

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="border border-border bg-surface/92 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
          <div className="flex flex-col gap-5 border-b border-hairline px-5 py-5 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center border border-accent bg-accent text-sm font-bold text-background">
                  &gt;_
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.28em] text-accent">
                    SHOULD I BUILD THIS?
                  </p>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-ink-dim">
                    ANALYSIS REPORT
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                <span className="border border-border px-3 py-2 font-mono">
                  slug {report.slug}
                </span>
                <span className="border border-border px-3 py-2 font-mono">
                  model {report.model}
                </span>
              </div>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                {report.shared.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-muted sm:text-[15px]">
                {report.shared.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div
              aria-label="Report view toggle"
              className="inline-flex w-full border border-border bg-background p-1 sm:w-auto"
              role="tablist"
            >
              <ToggleButton
                active={view === "builder"}
                label="BUILDER VIEW"
                onClick={() => setView("builder")}
              />
              <ToggleButton
                active={view === "investor"}
                label="INVESTOR VIEW"
                onClick={() => setView("investor")}
              />
            </div>

            <div className="text-xs text-ink-faint">
              Created from a live mobile share link. This page is read-only.
            </div>
          </div>
        </header>

        {view === "builder" ? (
          <BuilderReport report={report} metrics={builderMetrics} />
        ) : (
          <InvestorReport report={report} metrics={investorMetrics} concerns={concerns} bars={bars} />
        )}
      </div>
    </main>
  );
}

function BuilderReport({
  report,
  metrics,
}: {
  report: PublicReport;
  metrics: Array<{ label: string; value: string; subtitle: string; emphasis?: "danger" | "accent" }>;
}) {
  return (
    <>
      <MetricsGrid metrics={metrics} />

      <div className="grid gap-4">
        <SectionPanel number="01" title="PROBLEM CLARITY" defaultOpen>
          <p className="text-sm leading-7 text-ink-muted">
            {sanitizeReportText(report.builder_view.problem_clarity.summary)}
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <ListBlock
              label="STRENGTHS"
              tone="accent"
              items={report.builder_view.problem_clarity.strengths.map(sanitizeReportText)}
            />
            <ListBlock
              label="VULNERABILITIES"
              tone="danger"
              items={report.builder_view.problem_clarity.vulnerabilities.map(
                sanitizeReportText,
              )}
            />
          </div>

          <div className="mt-5 border border-border bg-background px-5 py-4">
            <p className="font-mono text-[10px] tracking-[0.24em] text-ink-dim">CLARITY SCORE</p>
            <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-accent">
              {report.builder_view.problem_clarity.clarity_score}
            </p>
          </div>
        </SectionPanel>

        <SectionPanel number="02" title="TECHNICAL FEASIBILITY">
          <p className="text-sm leading-7 text-ink-muted">
            {sanitizeReportText(report.builder_view.technical_feasibility)}
          </p>
        </SectionPanel>

        <SectionPanel number="03" title="LEARNING VALUE">
          <p className="text-sm leading-7 text-ink-muted">
            {sanitizeReportText(report.builder_view.learning_value)}
          </p>
        </SectionPanel>

        <SectionPanel number="04" title="APPROACHES TO BUILD">
          <p className="text-sm leading-7 text-ink-muted">
            {sanitizeReportText(report.builder_view.approaches_to_build)}
          </p>
        </SectionPanel>
      </div>

      <div className="sticky bottom-0 z-10 border border-accent bg-background/96 px-5 py-4 backdrop-blur sm:px-6">
        <p className="font-mono text-[10px] tracking-[0.24em] text-accent">FINAL RECOMMENDATION</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <RecommendationCard
            label="PRIMARY"
            value={sanitizeReportText(report.builder_view.final_recommendation.primary)}
          />
          <RecommendationCard
            label="SECONDARY"
            value={sanitizeReportText(report.builder_view.final_recommendation.secondary)}
          />
        </div>
      </div>
    </>
  );
}

function InvestorReport({
  report,
  metrics,
  concerns,
  bars,
}: {
  report: PublicReport;
  metrics: Array<{ label: string; value: string; subtitle: string; emphasis?: "danger" | "accent" }>;
  concerns: Array<{ title: string; description: string; severity: "warn" | "info" }>;
  bars: Array<{ label: string; value: string; width: number }>;
}) {
  return (
    <>
      <MetricsGrid metrics={metrics} />

      <div className="grid gap-4">
        <SectionPanel number="1." title="MARKET SIZE ASSESSMENT" defaultOpen>
          <div className="space-y-4">
            {bars.map((bar) => (
              <div key={bar.label} className="space-y-2">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">
                    {bar.label}
                  </p>
                  <p className="text-sm font-semibold text-accent">{bar.value}</p>
                </div>
                <div className="h-2 w-full bg-border">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${Math.max(bar.width, 0.12) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border border-border bg-[linear-gradient(180deg,#1c1c1c,#0a0a0a)] px-5 py-7 text-center">
            <p className="font-mono text-[10px] tracking-[0.24em] text-ink-dim">TARGET SECTOR</p>
            <p className="mt-3 text-2xl font-black tracking-[0.08em] text-accent">
              {sanitizeReportText(
                report.investor_view.market_size_assessment.target_sector,
              ).toUpperCase()}
            </p>
          </div>
        </SectionPanel>

        <SectionPanel number="2." title="DEFENSIBILITY MOATS">
          <p className="text-sm leading-7 text-ink-muted">
            {sanitizeReportText(report.investor_view.defensibility_moats)}
          </p>
        </SectionPanel>

        <SectionPanel number="3." title="TRACTION REQUIREMENTS">
          <p className="text-sm leading-7 text-ink-muted">
            {sanitizeReportText(report.investor_view.traction_requirements)}
          </p>
        </SectionPanel>

        <SectionPanel number="4." title="BUSINESS MODEL">
          <p className="text-sm leading-7 text-ink-muted">
            {sanitizeReportText(report.investor_view.business_model)}
          </p>
        </SectionPanel>

        <section className="border border-border bg-surface">
          <div className="border-b border-hairline px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-12 place-items-center bg-accent font-mono text-sm font-bold text-background">
                05
              </div>
              <div>
                <h2 className="font-mono text-[15px] tracking-[0.18em] text-white">
                  CRITICAL CONCERNS
                </h2>
                <p className="mt-1 text-xs text-ink-dim">Investor red flags and venture friction.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 px-5 py-5 sm:px-6">
            {concerns.map((concern, index) => (
              <article
                key={`${concern.title}-${index}`}
                className="border border-border bg-background px-5 py-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      concern.severity === "warn" ? "bg-danger" : "bg-accent"
                    }`}
                  />
                  <h3 className="font-mono text-[12px] tracking-[0.18em] text-white">
                    {concern.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-muted">{concern.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function MetricsGrid({
  metrics,
}: {
  metrics: Array<{ label: string; value: string; subtitle: string; emphasis?: "danger" | "accent" }>;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="border border-border bg-surface px-5 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          <p className="font-mono text-[10px] tracking-[0.24em] text-ink-dim">{metric.label}</p>
          <p
            className={`mt-4 text-3xl font-semibold tracking-[-0.04em] ${
              metric.emphasis === "danger"
                ? "text-danger"
                : metric.emphasis === "accent"
                  ? "text-accent"
                  : "text-white"
            }`}
          >
            {metric.value}
          </p>
          <p className="mt-4 text-sm leading-6 text-ink-muted">{metric.subtitle}</p>
        </article>
      ))}
    </section>
  );
}

function SectionPanel({
  number,
  title,
  defaultOpen,
  children,
}: {
  number: string;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="border border-border bg-surface">
      <summary className="cursor-pointer border-b border-hairline px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-12 place-items-center bg-accent font-mono text-sm font-bold text-background">
              {number}
            </div>
            <h2 className="font-mono text-[15px] tracking-[0.18em] text-white">{title}</h2>
          </div>
          <span className="font-mono text-[11px] tracking-[0.18em] text-ink-dim">EXPAND</span>
        </div>
      </summary>

      <div className="px-5 py-5 sm:px-6">{children}</div>
    </details>
  );
}

function ListBlock({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "accent" | "danger";
}) {
  return (
    <div className="border border-border bg-background px-5 py-5">
      <p
        className={`font-mono text-[11px] tracking-[0.22em] ${
          tone === "danger" ? "text-danger" : "text-accent"
        }`}
      >
        {label}
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-muted">
        {items.map((item, index) => (
          <li key={`${label}-${index}`} className="flex gap-3">
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                tone === "danger" ? "bg-danger" : "bg-accent"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendationCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-accent/40 bg-accent/8 px-4 py-4">
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">{label}</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-white">{value}</p>
    </div>
  );
}

function ToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-selected={active}
      type="button"
      onClick={onClick}
      role="tab"
      className={`min-w-[150px] px-4 py-3 font-mono text-[11px] tracking-[0.22em] transition ${
        active
          ? "bg-accent text-background"
          : "bg-transparent text-ink-dim hover:bg-white/3 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
