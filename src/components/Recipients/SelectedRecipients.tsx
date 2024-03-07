import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Layout from "./Layout";
import { groupEmailsByCompany } from "./data";

const SelectedRecipients = (props: SelectedRecipientProps) => {
  const { recipients, deselectRecipients } = props;
  const [selectedRecipients, setSelectedRecipients] = useState({});
  const emailsByCompany = groupEmailsByCompany(recipients);

  /**
   * Filters through recipients to find selected emails, compares
   * selected list of emails to master list for each company
   */
  const groupSelectedEmailData = () => {
    const selected = recipients.filter((r) => r.isSelected === true);
    const selectedEmailsByCompany = groupEmailsByCompany(selected);
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

  const emailDisplay = (e: string, padding?: string) => {
    return (
      <Box
        key={`${e}-selected`}
        as="span"
        flex="1"
        textAlign="left"
        justifyContent="space-between"
        display="flex"
        padding={padding ? padding : "0.5rem 1rem"}
      >
        <span style={{wordBreak: "break-word"}}>{e}</span>
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
                  {items.length > 0 ? (
                    <Accordion allowMultiple={true}>
                      {items.map((company) => {
                        const emails = emailsByCompany[company];
                        return (
                          <AccordionItem key={company}>
                            <AccordionButton>
                              <AccordionIcon />
                              <Box
                                key={`${company}-company-selected`}
                                as="span"
                                flex="1"
                                textAlign="left"
                                justifyContent="space-between"
                                display="flex"
                                padding={"0rem 1rem"}
                              >
                                <span>{company}</span>
                                <Button
                                  size="sm"
                                  color="red"
                                  variant="outline"
                                  onClick={() => {
                                    deselectAllEmailsForCompany(company);
                                  }}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </AccordionButton>

                            <AccordionPanel pb={4}>
                              {emails.map((e) => {
                                return emailDisplay(e.email, "0rem 2rem");
                              })}
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  ) : (
                    emptyState("company")
                  )}
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
