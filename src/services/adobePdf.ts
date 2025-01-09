import { ServicePrincipalCredentials } from '@adobe/pdfservices-node-sdk'

export const credentials = new ServicePrincipalCredentials({
    clientId: process.env.PDF_SERVICES_CLIENT_ID as string,
    clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET as string
});
