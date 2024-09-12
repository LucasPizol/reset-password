import { BadRequest } from "@/main/adapters/http-response";
import { env } from "@/main/config/env";
import { formatPhone } from "@/utils/format-phone";
import {
  SNSClient,
  PublishCommand,
  CheckIfPhoneNumberIsOptedOutCommand,
} from "@aws-sdk/client-sns";

class AWSService {
  private readonly snsClient: SNSClient;

  constructor() {
    if (
      !env.awsSdk.accessKeyId ||
      !env.awsSdk.secretAccessKey ||
      !env.awsSdk.region
    ) {
      throw new BadRequest("AWS credentials are missing");
    }

    this.snsClient = new SNSClient({
      region: env.awsSdk.region,
      credentials: {
        accessKeyId: env.awsSdk.accessKeyId,
        secretAccessKey: env.awsSdk.secretAccessKey,
      },
    });
  }

  async sendSMS(message: string, phoneNumber: string) {
    const formattedPhone = formatPhone(phoneNumber);

    const isOptedOut = await this.snsClient.send(
      new CheckIfPhoneNumberIsOptedOutCommand({ phoneNumber: formattedPhone })
    );

    if (isOptedOut.isOptedOut)
      throw new BadRequest(
        "Phone number is opted out, that means it's blocked from receiving SMS"
      );

    const response = await this.snsClient.send(
      new PublishCommand({
        PhoneNumber: formattedPhone,
        Message: message,
      })
    );

    return response;
  }
}

const awsService = new AWSService();
export { awsService as AwsService };
