import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

interface AccordionsProps {
  items: Array<{
    item: {
      itemHeader: string;
      itemContent: string;
    };
  }>;
}

export const Accordions = ({ items }: AccordionsProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-none"
    >
      {items.map((accordionItem, index) => (
        <AccordionItem
          key={`accordion-item-${index}`}
          className=""
          value={`item-${index + 1}`}
        >
          <AccordionTrigger>{accordionItem.item.itemHeader}</AccordionTrigger>
          <AccordionContent>{accordionItem.item.itemContent}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
