import { useState, type KeyboardEvent } from "react";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const flatTypes = ["1 BHK", "2 BHK", "3 BHK"] as const;
type FlatType = (typeof flatTypes)[number];

const bedroomCounts: Record<FlatType, number> = {
  "1 BHK": 1,
  "2 BHK": 2,
  "3 BHK": 3,
};

const bedroomItems = [
  { id: "wardrobe-room", title: "Wardrobe room" },
  { id: "dressing-unit", title: "Dressing unit (optional)" },
  { id: "bedroom-loft", title: "Loft" },
  { id: "study-unit", title: "Study unit (optional)" },
] as const;

const kitchenItems = [
  { id: "kitchen-counter", title: "Kitchen counter" },
  { id: "kitchen-wall-unit", title: "Kitchen wall unit" },
  { id: "kitchen-loft", title: "Kitchen loft" },
] as const;

const sharedItems = [
  { id: "pooja-unit", title: "Pooja unit" },
  { id: "tv-base-unit", title: "TV-base unit" },
  { id: "tv-back-panelling", title: "TV unit back panelling" },
  { id: "partition-wall", title: "Partition wall (optional)" },
  { id: "crockery-unit", title: "Crockery unit (optional)" },
  { id: "shoe-rack", title: "Shoe rack (optional)" },
] as const;

type Dimensions = {
  width: string;
  height: string;
};

const TV_BACK_PANELLING_RATE = 700;

const Estimation = () => {
  const navigate = useNavigate();
  const [selectedFlat, setSelectedFlat] = useState<FlatType>("1 BHK");
  const [openBedrooms, setOpenBedrooms] = useState<Record<string, boolean>>({
    "Bedroom 1": true,
    "Bedroom 2": true,
    "Bedroom 3": true,
  });
  const [isKitchenOpen, setIsKitchenOpen] = useState(true);
  const [measurements, setMeasurements] = useState<Record<string, Dimensions>>({});
  const [errorMessage, setErrorMessage] = useState("");

  const bedroomCount = bedroomCounts[selectedFlat];

  const toggleBedroom = (roomName: string) => {
    setOpenBedrooms((current) => ({
      ...current,
      [roomName]: !current[roomName],
    }));
  };

  const getDimensions = (key: string): Dimensions => measurements[key] ?? { width: "", height: "" };

  const updateDimension = (key: string, dimension: keyof Dimensions, value: string) => {
    setMeasurements((current) => ({
      ...current,
      [key]: {
        ...getDimensions(key),
        [dimension]: value,
      },
    }));
  };

  const handleEnterToNextInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const allInputs = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[data-estimation-input="true"]'),
    );

    const currentIndex = allInputs.indexOf(event.currentTarget);
    if (currentIndex === -1) {
      return;
    }

    const nextInput = allInputs[currentIndex + 1];
    if (nextInput) {
      nextInput.focus();
      nextInput.select();
      return;
    }

    event.currentTarget.blur();
  };

  const parseValue = (value: string) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  };

  const areaFromKey = (key: string) => {
    const dims = getDimensions(key);
    return parseValue(dims.width) * parseValue(dims.height);
  };

  const tvBackPanellingArea = areaFromKey("shared-tv-back-panelling");
  const tvBackPanellingAmount = tvBackPanellingArea * TV_BACK_PANELLING_RATE;

  const totalArea = (() => {
    let runningArea = 0;

    for (let index = 0; index < bedroomCount; index += 1) {
      bedroomItems.forEach((item) => {
        runningArea += areaFromKey(`bedroom-${index + 1}-${item.id}`);
      });
    }

    kitchenItems.forEach((item) => {
      runningArea += areaFromKey(`kitchen-${item.id}`);
    });

    sharedItems.forEach((item) => {
      if (item.id === "tv-back-panelling") {
        return;
      }
      runningArea += areaFromKey(`shared-${item.id}`);
    });

    return runningArea;
  })();

  const handleSaveAndNext = () => {
    if (totalArea <= 0 && tvBackPanellingAmount <= 0) {
      setErrorMessage("Please enter width and height values before continuing.");
      return;
    }

    setErrorMessage("");
    const areaRounded = Number(totalArea.toFixed(2));

    window.localStorage.setItem(
      "estimationDraft",
      JSON.stringify({
        flatType: selectedFlat,
        totalArea: areaRounded,
        tvBackPanellingAmount,
      }),
    );

    navigate(
      `/estimation/material-selection?flat=${encodeURIComponent(selectedFlat)}&area=${areaRounded}&tvBackPanellingAmount=${tvBackPanellingAmount}`,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="section-label mb-1">Estimation page</p>
            <h1 className="font-display text-2xl text-foreground md:text-3xl">Flat measurement details</h1>
          </div>
          <Button asChild variant="outline" className="rounded-sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        <section className="space-y-6">
            <div className="max-w-2xl space-y-3">
              <p className="section-label">Estimate setup</p>
              <h2 className="font-display text-4xl font-light leading-tight text-foreground md:text-5xl">
                Choose the flat type and capture the first set of measurements.
              </h2>
              <p className="font-body text-sm leading-relaxed text-muted-foreground md:text-base">
                Start with 1 BHK, 2 BHK, or 3 BHK. Each flat uses the same structure, with Bedroom 1, Bedroom 2,
                and Bedroom 3 added as needed, plus the shared pooja unit, kitchen section, and optional items.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {flatTypes.map((flat) => {
                const active = selectedFlat === flat;

                return (
                  <button
                    key={flat}
                    type="button"
                    onClick={() => setSelectedFlat(flat)}
                    className={`flex items-center justify-between rounded-md border px-4 py-4 text-left transition-all duration-200 ${
                      active
                        ? "border-foreground bg-foreground text-background shadow-sm"
                        : "border-border bg-card text-foreground hover:border-foreground/40 hover:bg-muted/60"
                    }`}
                  >
                    <span className="font-display text-xl">{flat}</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </button>
                );
              })}
            </div>

            <Card className="border-border/70 shadow-none">
              <CardHeader>
                <CardTitle className="font-display text-2xl font-normal">
                  {selectedFlat} measurement form
                </CardTitle>
                <CardDescription>
                  Enter width and height for each component. Total area is calculated as width x height for every
                  filled section.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: bedroomCount }, (_, index) => {
                      const roomName = `Bedroom ${index + 1}`;
                      const isOpen = openBedrooms[roomName] ?? true;

                      return (
                        <div key={roomName} className="space-y-4 rounded-md border border-border bg-background p-4">
                          <button
                            type="button"
                            onClick={() => toggleBedroom(roomName)}
                            className="flex w-full items-center justify-between gap-4 text-left transition-colors duration-200 hover:border-foreground/40"
                          >
                            <div>
                              <h3 className="font-display text-lg text-foreground">{roomName}</h3>
                              <p className="font-body text-xs text-muted-foreground">
                                Click to view wardrobe room, dressing unit, loft, and study unit measurements.
                              </p>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                                isOpen ? "rotate-180" : "rotate-0"
                              }`}
                            />
                          </button>

                          {isOpen ? (
                            <div className="space-y-3">
                              {bedroomItems.map((subItem) => (
                                <div key={subItem.title} className="rounded-md border border-border/70 bg-muted/30 p-3">
                                  <p className="font-display text-sm text-foreground">{subItem.title}</p>
                                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="space-y-2">
                                      <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                        Width
                                      </Label>
                                      <Input
                                        data-estimation-input="true"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={getDimensions(`bedroom-${index + 1}-${subItem.id}`).width}
                                        onKeyDown={handleEnterToNextInput}
                                        onChange={(event) =>
                                          updateDimension(
                                            `bedroom-${index + 1}-${subItem.id}`,
                                            "width",
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                        Height
                                      </Label>
                                      <Input
                                        data-estimation-input="true"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={getDimensions(`bedroom-${index + 1}-${subItem.id}`).height}
                                        onKeyDown={handleEnterToNextInput}
                                        onChange={(event) =>
                                          updateDimension(
                                            `bedroom-${index + 1}-${subItem.id}`,
                                            "height",
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      );
                  })}

                  <div className="space-y-4 rounded-md border border-border bg-background p-4 text-left transition-colors duration-200 hover:border-foreground/40">
                    <div className="flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setIsKitchenOpen((open) => !open)}
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <div>
                          <h3 className="font-display text-lg text-foreground">Kitchen</h3>
                          <p className="font-body text-xs text-muted-foreground">
                            Click to view counter, wall unit, and loft measurements.
                          </p>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                            isKitchenOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    </div>

                    {isKitchenOpen ? (
                      <div className="space-y-3">
                        {kitchenItems.map((subItem) => (
                          <div key={subItem.title} className="rounded-md border border-border/70 bg-muted/30 p-3">
                            <p className="font-display text-sm text-foreground">{subItem.title}</p>
                            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                  Width
                                </Label>
                                <Input
                                  data-estimation-input="true"
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="0.00"
                                  value={getDimensions(`kitchen-${subItem.id}`).width}
                                  onKeyDown={handleEnterToNextInput}
                                  onChange={(event) =>
                                    updateDimension(`kitchen-${subItem.id}`, "width", event.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                  Height
                                </Label>
                                <Input
                                  data-estimation-input="true"
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="0.00"
                                  value={getDimensions(`kitchen-${subItem.id}`).height}
                                  onKeyDown={handleEnterToNextInput}
                                  onChange={(event) =>
                                    updateDimension(`kitchen-${subItem.id}`, "height", event.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {sharedItems.map((item) => (
                    <div key={item.id} className="space-y-4 rounded-md border border-border bg-background p-4">
                      <div>
                        <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                        <p className="font-body text-xs text-muted-foreground">
                          Fill the dimensions for this element.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Width
                          </Label>
                          <Input
                            data-estimation-input="true"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={getDimensions(`shared-${item.id}`).width}
                            onKeyDown={handleEnterToNextInput}
                            onChange={(event) =>
                              updateDimension(`shared-${item.id}`, "width", event.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Height
                          </Label>
                          <Input
                            data-estimation-input="true"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={getDimensions(`shared-${item.id}`).height}
                            onKeyDown={handleEnterToNextInput}
                            onChange={(event) =>
                              updateDimension(`shared-${item.id}`, "height", event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 rounded-md border border-border bg-muted/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-lg text-foreground">Selected flat type</p>
                    <p className="font-body text-sm text-muted-foreground">
                      {selectedFlat} selected. Total calculated area: {totalArea.toFixed(2)} sq.ft.
                    </p>
                  </div>
                  <Button className="rounded-sm" onClick={handleSaveAndNext}>Save and Next</Button>
                </div>

                {errorMessage ? (
                  <p className="font-body text-sm text-destructive">{errorMessage}</p>
                ) : null}
              </CardContent>
            </Card>
        </section>
      </main>
    </div>
  );
};

export default Estimation;