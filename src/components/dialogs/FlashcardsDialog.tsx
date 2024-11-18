"use client";
import { useIsFlashcardsDialog } from "@/lib/context";
import { useMarkdownEditorState } from "@/lib/hooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { generateFlashCards } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

type TFlashCardProps = {
  back: string;
  front: string;
};

const FlashcardsDialog = () => {
  const { flashcardsDialogOpen, setFlashcardsDialogOpen } =
    useIsFlashcardsDialog();
  const [cards, setCards] = useState<TFlashCardProps[]>([]);

  const state = useMarkdownEditorState();

  useEffect(() => {
    (async () => {
      const md = await state;
      const payload = await generateFlashCards(md);
      setCards(payload);
    })();
  }, [state]);

  return (
    <Dialog open={flashcardsDialogOpen} onOpenChange={setFlashcardsDialogOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center justify-center">
          <Carousel className="w-full">
            <CarouselContent>
              {cards!.map((card, index) => {
                return (
                  <CarouselItem
                    className="group h-[300px] max-w-sm [perspective:1000px]"
                    key={index}
                  >
                    <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      {/* Front Face */}
                      <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
                        <h3>{card?.front}</h3>
                      </div>
                      {/* Back Face */}
                      <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="flex min-h-full flex-col items-center justify-center">
                          <h2 className="mb-4 text-2xl font-bold">
                            {card.back}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlashcardsDialog;
