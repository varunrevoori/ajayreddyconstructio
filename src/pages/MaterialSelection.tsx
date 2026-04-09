import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const plyTypes = [
  { id: "century-club-sainik", label: "Century Club Sainik", rate: 600 },
  { id: "century-club-premium", label: "Century Club Premium", rate: 700 },
  { id: "garjan-710-bwp", label: "Garjan 710", rate: 500 },
] as const;

const finishingTypes = [
  { id: "laminate", label: "Laminate", rate: 120 },
  { id: "acrylic", label: "Acrylic", rate: 180 },
  { id: "pu-finish", label: "PU finish", rate: 250 },
] as const;

const hardwareTypes = [
  { id: "nimmi", label: "Nimmi", rate: 80 },
  { id: "hettich", label: "Hettich", rate: 200 },
] as const;

const MaterialSelection = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const queryArea = Number(searchParams.get("area") ?? "0");
  const queryFlat = searchParams.get("flat") ?? "";
  const queryTvBackPanellingAmount = Number(searchParams.get("tvBackPanellingAmount") ?? "0");

  const storedDraft = useMemo(() => {
    try {
      const parsed = window.localStorage.getItem("estimationDraft");
      return parsed ? JSON.parse(parsed) : null;
    } catch {
      return null;
    }
  }, []);

  const area = queryArea > 0 ? queryArea : Number(storedDraft?.totalArea ?? 0);
  const flatType = queryFlat || String(storedDraft?.flatType ?? "");
  const tvBackPanellingAmount =
    queryTvBackPanellingAmount > 0
      ? queryTvBackPanellingAmount
      : Number(storedDraft?.tvBackPanellingAmount ?? 0);

  const [selectedPlyType, setSelectedPlyType] = useState<(typeof plyTypes)[number]["id"]>(plyTypes[0].id);
  const [selectedFinishingType, setSelectedFinishingType] = useState<(typeof finishingTypes)[number]["id"]>(
    finishingTypes[0].id,
  );
  const [selectedHardwareType, setSelectedHardwareType] = useState<(typeof hardwareTypes)[number]["id"]>(
    hardwareTypes[0].id,
  );

  const selectedPlyRate = plyTypes.find((item) => item.id === selectedPlyType)?.rate ?? 0;
  const selectedFinishingRate = finishingTypes.find((item) => item.id === selectedFinishingType)?.rate ?? 0;
  const selectedHardwareRate = hardwareTypes.find((item) => item.id === selectedHardwareType)?.rate ?? 0;

  const pricePerSqft = selectedPlyRate + selectedFinishingRate + selectedHardwareRate;
  const areaBasedAmount = area * pricePerSqft;
  const estimatedAmount = areaBasedAmount + tvBackPanellingAmount;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="section-label mb-1">Material selection</p>
            <h1 className="font-display text-2xl text-foreground md:text-3xl">Choose materials and estimate amount</h1>
          </div>
          <Button asChild variant="outline" className="rounded-sm">
            <Link to="/estimation">
              <ArrowLeft className="h-4 w-4" />
              Back to estimation
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {area <= 0 && tvBackPanellingAmount <= 0 ? (
          <Card className="border-border/70 shadow-none">
            <CardHeader>
              <CardTitle className="font-display text-2xl font-normal">Area not found</CardTitle>
              <CardDescription>
                Please go back, fill width and height values, and click Save and Next again.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="space-y-6">
              <Card className="border-border/70 shadow-none">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-normal">Ply type selection</CardTitle>
                  <CardDescription>Select one ply type and rate per sq.ft.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plyTypes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedPlyType(item.id)}
                      className={`w-full rounded-md border px-4 py-3 text-left transition-colors duration-200 ${
                        selectedPlyType === item.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground hover:border-foreground/40"
                      }`}
                    >
                      <p className="font-body text-sm">{item.label}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70 shadow-none">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-normal">Finishing type selection</CardTitle>
                  <CardDescription>Select one finishing type and rate per sq.ft.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {finishingTypes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedFinishingType(item.id)}
                      className={`w-full rounded-md border px-4 py-3 text-left transition-colors duration-200 ${
                        selectedFinishingType === item.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground hover:border-foreground/40"
                      }`}
                    >
                      <p className="font-body text-sm">{item.label}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70 shadow-none">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-normal">Hardware type selection</CardTitle>
                  <CardDescription>Select one hardware type and rate per sq.ft.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hardwareTypes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedHardwareType(item.id)}
                      className={`w-full rounded-md border px-4 py-3 text-left transition-colors duration-200 ${
                        selectedHardwareType === item.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground hover:border-foreground/40"
                      }`}
                    >
                      <p className="font-body text-sm">{item.label}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </section>

            <aside className="space-y-6 lg:pt-1">
              <Card className="border-border/70 bg-card shadow-none">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-normal">Estimate summary</CardTitle>
                  <CardDescription>Calculated from your previous area and selected materials.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border border-border bg-background p-4">
                    <p className="font-body text-sm text-muted-foreground">Flat type</p>
                    <p className="font-display text-xl text-foreground">{flatType || "Not provided"}</p>
                  </div>

                  <div className="rounded-md border border-border bg-background p-4">
                    <p className="font-body text-sm text-muted-foreground">Total area</p>
                    <p className="font-display text-xl text-foreground">{area.toFixed(2)} sq.ft.</p>
                  </div>

                  <div className="rounded-md border border-border bg-background p-4">
                    <p className="font-body text-sm text-muted-foreground">Price per sq.ft.</p>
                    <p className="font-display text-xl text-foreground">Rs {pricePerSqft.toLocaleString()}</p>
                    <p className="mt-2 font-body text-xs text-muted-foreground">
                      Ply {selectedPlyRate} + Finishing {selectedFinishingRate} + Hardware {selectedHardwareRate}
                    </p>
                  </div>

                  <div className="rounded-md border border-border bg-background p-4">
                    <p className="font-body text-sm text-muted-foreground">TV back panelling amount</p>
                    <p className="font-display text-xl text-foreground">Rs {tvBackPanellingAmount.toLocaleString()}</p>
                    <p className="mt-2 font-body text-xs text-muted-foreground">Calculated as width x height x 700 from previous page.</p>
                  </div>

                  <div className="rounded-md border border-border bg-background p-4">
                    <p className="font-body text-sm text-muted-foreground">Area-based amount</p>
                    <p className="font-display text-xl text-foreground">Rs {areaBasedAmount.toLocaleString()}</p>
                  </div>

                  <div className="rounded-md border border-foreground bg-foreground p-4 text-background">
                    <p className="font-body text-sm">Estimated amount</p>
                    <p className="font-display text-3xl">Rs {estimatedAmount.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default MaterialSelection;