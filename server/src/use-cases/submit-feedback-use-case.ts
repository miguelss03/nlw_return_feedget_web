import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackCaseRquest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepositorys: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }

    async execute(request: SubmitFeedbackCaseRquest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required');
        }

        if (!comment) {
            throw new Error('Comment is required');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepositorys.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family:sans-serif; font-size:16px; color:#111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : ``,
                `</div>`
            ].join('\n')
        })
    }
}
