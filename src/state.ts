import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

interface PolicyState {
    policy: string;
    updatePolicy: (policy: string) => void;
}

const usePolicyState = create<PolicyState, any>(
    persist(
        (set) => ({
            policy: JSON.stringify(
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
            ),
            updatePolicy: (policy: string) => set({ policy }),
        }),
        {
            name: "policy",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default usePolicyState;