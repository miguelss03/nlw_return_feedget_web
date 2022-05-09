// testes unitários
// normalmente teste descritivos para que quem veja, leia e 
//entenda exatamente o que está sendo testado

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback ', async () => {
        

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {
        
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64/8129s89s7988d7sd8r',
        })).rejects.not.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {
        
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64/8129s89s7988d7sd8r',
        })).rejects.not.toThrow();
    });

    it('should not be able to submit feedback without screenshot', async () => {
        
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exmeple comment',
            screenshot: 'test.jpeg',
        })).rejects.not.toThrow();
    });
});