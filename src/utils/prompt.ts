/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import type { CheckboxQuestion, ListChoiceOptions, ListQuestion, Question } from 'inquirer';
import inquirer from 'inquirer';

export async function askConfirmation(message: string, defaultResponse: boolean): Promise<boolean> {
  const question: Question = {
    type: 'confirm',
    name: 'confirmation',
    prefix: '',
    message,
    default: defaultResponse,
  };

  const { prompt } = inquirer;
  const answers = await prompt([question]);

  return answers['confirmation'];
}

export async function askQuestion(
  message: string,
  choices: ListChoiceOptions[],
  defaultResponseIndex: number,
): Promise<string | null> {
  const question: ListQuestion = {
    type: 'list',
    name: 'answer',
    prefix: '',
    message,
    choices,
    default: defaultResponseIndex,
  };

  const { prompt } = inquirer;
  const answers = await prompt([question]);

  return answers['answer'];
}

export async function askChoices<T>(
  message: string,
  choices: { name: string; value: T }[],
  defaultValue: T[],
): Promise<T[] | null> {
  const question: CheckboxQuestion = {
    type: 'checkbox',
    name: 'answer',
    prefix: '',
    message,
    choices,
    default: defaultValue,
  };

  const { prompt } = inquirer;
  const answers = await prompt([question]);

  return answers['answer'] as T[];
}
