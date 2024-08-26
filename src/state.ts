import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Policy {
    Version: string;
    Statement: Statement[];
}

export interface Statement {
    Sid: string | undefined;
    Effect: "Allow" | "Deny";
    Action: string[] | string;
    Resource: string[] | string;
}

interface PolicyState {
    valid_policy: string;
    policy: string;
    updatePolicy: (policy: string) => void;
}

const defaultPolicy = JSON.stringify(
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": ["*"],
                "Resource": ["*"]
            }
        ]
    },
    null,
    2
);

const usePolicyState = create<PolicyState, any>(
    persist(
        (set) => ({
            valid_policy: defaultPolicy,
            policy: defaultPolicy,
            updatePolicy: (policy: string) => {
                set({ policy });
                try {
                    JSON.parse(policy);
                    set({ valid_policy: policy });
                } catch (_) { }
            },
        }),
        {
            name: "policy",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default usePolicyState;