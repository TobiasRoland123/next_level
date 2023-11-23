import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

export const Accordions = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-none"
    >
      <AccordionItem
        className=""
        value="item-1"
      >
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent className="">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
