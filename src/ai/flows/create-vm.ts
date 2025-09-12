


/**
 * @fileOverview An AI flow to create a Google Compute Engine virtual machine.
 *
 * This flow takes VM specifications and uses the Google Cloud API to provision
 * a new instance.
 *
 * @module AI/Flows/CreateVm
 *
 * @export {function} createVm - The main function to create a VM.
 * @export {type} CreateVmInput - The Zod schema for the input.
 * @export {type} CreateVmOutput - The Zod schema for the output.
 */

import { ai } from '@/ai/genkit';
import { google } from 'googleapis';
import { CreateVmInputSchema, CreateVmOutputSchema, type CreateVmInput, type CreateVmOutput } from '@/types';


/**
 * An AI flow that provisions a Google Compute Engine VM.
 *
 * @param {CreateVmInput} input - The input data for creating the VM.
 * @returns {Promise<CreateVmOutput>} A promise that resolves with the creation status.
 */
export async function createVm(input: CreateVmInput): Promise<CreateVmOutput> {
  return createVmFlow(input);
}


const createVmFlow = ai.defineFlow(
  {
    name: 'createVmFlow',
    inputSchema: CreateVmInputSchema,
    outputSchema: CreateVmOutputSchema,
  },
  async (input) => {
    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/compute'],
      });
      const authClient = await auth.getClient();
      const project = await auth.getProjectId();
      const compute = google.compute({ version: 'v1', auth: authClient });

      const operation = await compute.instances.insert({
        project,
        zone: input.zone,
        requestBody: {
          name: input.instanceName,
          machineType: `zones/${input.zone}/machineTypes/${input.machineType}`,
          disks: [
            {
              boot: true,
              autoDelete: true,
              initializeParams: {
                sourceImage: `projects/debian-cloud/global/images/family/${input.sourceImageFamily}`,
                diskSizeGb: input.diskSizeGb.toString(),
              },
            },
          ],
          networkInterfaces: [
            {
              // Use the default VPC network.
              network: 'global/networks/default',
              // Request an ephemeral public IP.
              accessConfigs: [
                {
                  name: 'External NAT',
                  type: 'ONE_TO_ONE_NAT',
                },
              ],
            },
          ],
        },
      });

      // Wait for the operation to complete.
      let op = operation.data;
      while (op.status !== 'DONE') {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        const [getOperation] = await compute.zoneOperations.wait({
            operation: op.name!,
            project: project,
            zone: input.zone,
        });
        op = getOperation;
      }
      
      if (op.error) {
          const errorMessage = op.error.errors?.map(e => e.message).join(', ') || 'An unknown error occurred during VM creation.';
          throw new Error(errorMessage);
      }

      const [instance] = await compute.instances.get({
        project,
        zone: input.zone,
        instance: input.instanceName,
      });

      return {
        success: true,
        message: `Successfully created VM instance '${input.instanceName}'.`,
        instanceName: instance.name!,
        selfLink: instance.selfLink!
      };
    } catch (e: any) {
        console.error("VM Creation Error:", e);
        // Ensure we throw a simple error message string
        const errorMessage = e.errors?.[0]?.message || e.message || 'An unknown error occurred during VM creation.';
        throw new Error(errorMessage);
    }
  }
);

