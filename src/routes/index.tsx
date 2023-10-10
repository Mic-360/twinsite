import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Screen } from "../components/ui/Screen";

export default component$(() => {
  return (
    <div class='flex flex-col justify-center items-center h-full'>
      <Screen />
      <div class="absolute bottom-10 text-center uppercase">
        <h1 class="text-xl mx-auto font-bold tracking-widest">
          Coming Soon <span class='animate-ping'>_</span>
        </h1>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Twinverse Technology Pvt. Ltd.",
  meta: [
    {
      name: "DYNAMIC AUGMENTED REALITY/VIRTUAL REALITY COMPANY",
      content:
        "WE ARE A DYNAMIC AUGMENTED REALITY/VIRTUAL REALITY COMPANY SPECIALIZING IN CRAFTING CUSTOM EXPERIENCES THAT TRANSPORT YOUR AUDIENCE TO EXTRAORDINARY REALMS, SHOWCASING YOUR BRAND, PRODUCTS, AND LOCATIONS IN WAYS THAT LEAVE A LASTING IMPRESSION.",
    },
  ],
};
