import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Center,
    Heading,
    CloseButton,
    Stack,
    Button,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';

const AvailableRecipients = (props: AvailableRecipientsProps) => {
    const { recipients, deselectRecipients } = props;
    const [selectedRecipients, setSelectedRecipients] = useState({});

    const groupByCompany = (emails) => {
        const emailsByCompany = {};
        emails.forEach((e) => {
            const key = e.email.split('@')[1];
            if (emailsByCompany[key]) {
                const emailsForKey = emailsByCompany[key];
                emailsForKey.push(e);
                emailsByCompany[key] = emailsForKey;
            } else {
                emailsByCompany[key] = [e];
            }
        });
        return emailsByCompany;
    }

    useEffect(() => {
        setSelectedRecipients(groupByCompany(recipients.filter((r)=>r.isSelected === true)));
    }, [recipients]);

    const emailDisplay = (e) => {
        return <Box key={`${e.email}-selected`} as="span" flex='1' textAlign='left' justifyContent="space-between" display='flex' padding={'0.5rem 1rem'}>
            <span>{e.email}</span>
            <CloseButton size="sm" onClick={()=>deselectRecipients([e.email])}/>
        </Box>;
    };

    return <Box borderWidth='1px' borderRadius='lg' overflow='hidden' padding="0.5rem">
        <Stack mt='6' spacing='3'>
            <Center><Heading size='md'>Selected Recipients</Heading></Center>
            <Accordion allowMultiple={true}>
                {Object.keys(selectedRecipients).map((key) => {
                    const emailsForKey = selectedRecipients[key];
                    if (emailsForKey.length === 1) {
                        return emailDisplay(emailsForKey[0]);
                    }
                    return <AccordionItem key={key}>
                        <h2>
                            <AccordionButton>
                                <AccordionIcon />

                                <Box as="h4" flex='1' textAlign='left' fontWeight='bold' display="flex" justifyContent="space-between">
                                    <span>{key}</span>
                                    <Button colorScheme='red' variant='outline' size="xs" onClick={() => deselectRecipients(emailsForKey.map(e => e.email))}>
                                        Remove All
                                    </Button>
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {emailsForKey.map((e) => {
                                return emailDisplay(e);
                            })}
                        </AccordionPanel>
                    </AccordionItem>
                })}
            </Accordion>
        </Stack>
    </Box>;
}

declare interface AvailableRecipientsProps {
    recipients: { email: string, isSelected: boolean }[],
    deselectRecipients: (emails: string[]) => void
}

export default AvailableRecipients;
