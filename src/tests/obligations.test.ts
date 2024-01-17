import instanciator from 'PolicyInstanciator';
import evaluator from 'PolicyEvaluator';
import { expect } from 'chai';
import { _logCyan, _logGreen, _logObject, _logYellow } from './utils';
import { Policy } from 'models/odrl/Policy';

const assignee = 'http://example.com/person:44';
const json = {
  '@context': 'https://www.w3.org/ns/odrl/2/',
  '@type': 'Agreement',
  assignee,
  obligation: [
    {
      assigner: 'http://example.com/org:43',
      assignee,
      action: [
        {
          value: 'compensate',
          refinement: [
            {
              leftOperand: 'payAmount',
              operator: 'eq',
              rightOperand: 500,
              unit: 'http://dbpedia.org/resource/Euro',
            },
          ],
        },
      ],
    },
  ],
};

describe(`Testing 'Obligations' related units`, async () => {
  let policy: Policy | null;
  before(() => {
    policy = instanciator.genPolicyFrom(json);
    policy?.debug();
  });
  it(`Should retrieve assigned "RuleDuties" for specified "assignee"`, async function () {
    _logCyan('\n> ' + this.test?.title);
    const valid = await policy?.validate();
    expect(valid).to.equal(true);
    if (policy) {
      evaluator.setPolicy(policy);
      evaluator.getAssignedDuties(assignee);
    }
  });

  it(`Should verify assignee's fulfillment of "Obligations"`, async function () {
    const fulfilled = await evaluator.fulfillDuties(assignee);
    expect(fulfilled).to.equal(true);
  });
  return;
  it(``, async function () {
    const json = {
      '@context': 'https://www.w3.org/ns/odrl/2/',
      '@type': 'Offer',
      permission: [
        {
          assigner: 'http://example.com/assigner:corp',
          target: 'http://example.com/music/1999.mp3',
          action: 'play',
          duty: [
            {
              action: [
                {
                  value: 'compensate',
                  refinement: [
                    {
                      leftOperand: 'payAmount',
                      operator: 'eq',
                      rightOperand: 5,
                      unit: 'http://dbpedia.org/resource/Euro',
                    },
                  ],
                },
              ],
              /*
              constraint: [
                {
                  leftOperand: 'event',
                  operator: 'lt',
                  rightOperand: { '@id': 'odrl:policyUsage' },
                },
              ],
              */
            },
          ],
        },
      ],
    };
    const policy = instanciator.genPolicyFrom(json);
    policy?.debug();
    const valid = await policy?.validate();
    expect(valid).to.equal(true);
    if (policy) {
      evaluator.setPolicy(policy);
      const isPerformable = await evaluator.isActionPerformable(
        'play',
        'http://example.com/music/1999.mp3',
      );
    }
  });
});
