import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Layout from "./Layout";
import { groupEmailsByCompany } from "./data";

const SelectedRecipients = (props: SelectedRecipientProps) => {
  const { recipients, deselectRecipients } = props;
  const [selectedRecipients, setSelectedRecipients] = useState({});

  /**
   * Filters through recipients to find selected emails, compares
   * selected list of emails to master list for each company
   */
  const groupSelectedEmailData = () => {
    const selected = recipients.filter((r) => r.isSelected === true);
    const selectedEmailsByCompany = groupEmailsByCompany(selected);
    const emailsByCompany = groupEmailsByCompany(recipients);
    const emailRecipients = [];
    const companyRecipients = [];
    Object.keys(selectedEmailsByCompany).map((key) => {
      const emailsForKey = selectedEmailsByCompany[key];
      if (emailsForKey.length === emailsByCompany[key].length) {
        companyRecipients.push(key);
      } else {
        emailRecipients.push(...emailsForKey);
      }
    });
    return {
      "company recipients": companyRecipients,
      "email recipients": emailRecipients,
    };
  };

  /**
   * handles updates to the recipients object
   */
  useEffect(() => {
    setSelectedRecipients(groupSelectedEmailData());
  }, [recipients]);

  const emailDisplay = (e: string) => {
    return (
      <Box
        key={`${e}-selected`}
        as="span"
        flex="1"
        textAlign="left"
        justifyContent="space-between"
        display="flex"
        padding={"0.5rem 1rem"}
      >
        <span>{e}</span>
        <CloseButton size="sm" onClick={() => deselectRecipients([e])} />
      </Box>
    );
  };

  const deselectAllEmailsForCompany = (company: string) => {
    const emailsByCompany = groupEmailsByCompany(recipients);
    const emailsForCompany = emailsByCompany[company];
    deselectRecipients(emailsForCompany.map((e) => e.email));
  };

  const emptyState = (k: string) => {
    return (
      <Box
        as="span"
        flex="1"
        textAlign="left"
        justifyContent="space-between"
        display="flex"
        padding={"0.5rem 1rem"}
      >
        <span>There are no {k} recipients</span>
      </Box>
    );
  };

  const accordionTitle = (t: string) => {
    return (
      <h2>
        <AccordionButton>
          <AccordionIcon />
          <Box
            as="h4"
            flex="1"
            textAlign="left"
            fontWeight="bold"
            display="flex"
            justifyContent="space-between"
          >
            <span>{t}</span>
          </Box>
        </AccordionButton>
      </h2>
    );
  };

  return (
    <Layout title="Selected Recipients">
      <Accordion allowMultiple={true}>
        {Object.keys(selectedRecipients).map((key) => {
          const items = selectedRecipients[key];
          if (key === "company recipients") {
            return (
              <AccordionItem key={key}>
                {accordionTitle("Company Recipients")}
                <AccordionPanel pb={4}>
                  {items.length > 0
                    ? items.map((company) => {
                        return (
                          <Box
                            key={`${company}-company-selected`}
                            as="span"
                            flex="1"
                            textAlign="left"
                            justifyContent="space-between"
                            display="flex"
                            padding={"0.5rem 1rem"}
                          >
                            <span>{company}</span>
                            <CloseButton
                              size="sm"
                              onClick={() => {
                                deselectAllEmailsForCompany(company);
                              }}
                            />
                          </Box>
                        );
                      })
                    : emptyState("company")}
                </AccordionPanel>
              </AccordionItem>
            );
          } else {
            return (
              <AccordionItem key={key}>
                {accordionTitle("Email Recipients")}
                <AccordionPanel pb={4}>
                  {items.length > 0
                    ? items.map((e) => {
                        return emailDisplay(e.email);
                      })
                    : emptyState("email")}
                </AccordionPanel>
              </AccordionItem>
            );
          }
        })}
      </Accordion>
    </Layout>
  );
};

declare interface SelectedRecipientProps {
  recipients: { email: string; isSelected: boolean }[];
  deselectRecipients: (emails: string[]) => void;
}

export default SelectedRecipients;
