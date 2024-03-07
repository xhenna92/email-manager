import { ReactNode } from 'react';
import {
    Box,
    Center,
    Heading,
    Stack,
} from '@chakra-ui/react'

const Layout = (props: LayoutProps) => {
    const {children, title} = props;
    return <Box borderWidth='1px' borderRadius='lg' overflow='hidden' padding="0.5rem">
        <Stack mt='6' spacing='3'>
            <Center>
                <Heading size='md'>{title}</Heading>
            </Center>
            {children}
        </Stack>
    </Box>;
}

declare interface LayoutProps {
    children: ReactNode,
    title: string
}

export default Layout;
