import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Screen } from "../components/ui/Screen";

export default component$(() => {
  return (
    <>
      <div class="container-center">
        <Screen />
        <div class="typewriter absolute bottom-10 w-full uppercase">
          <h1 class="text-center text-xl font-bold tracking-widest text-[#eeff15]">
            Coming Soon ...
          </h1>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Twinverse Technology",
  meta: [
    {
      name: "DYNAMIC AUGMENTED REALITY/VIRTUAL REALITY COMPANY",
      content:
        "WE ARE A DYNAMIC AUGMENTED REALITY/VIRTUAL REALITY COMPANY SPECIALIZING IN CRAFTING CUSTOM EXPERIENCES THAT TRANSPORT YOUR AUDIENCE TO EXTRAORDINARY REALMS, SHOWCASING YOUR BRAND, PRODUCTS, AND LOCATIONS IN WAYS THAT LEAVE A LASTING IMPRESSION.",
    },
  ],
};
