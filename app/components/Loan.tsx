import type { FragmentType } from "~/gql";
import { graphql, useFragment } from "~/gql";

const LoanFragment = graphql(`
  fragment LoanComponent on Loan {
    id
    item {
      book {
        name
        authors {
          id
          firstName
          lastName
        }
      }
    }
  }
`);

export function Loan(props: { loan: FragmentType<typeof LoanFragment> }) {
  const loan = useFragment(LoanFragment, props.loan);

  return (
    <section>
      <p>{loan.item?.book?.name ?? "unknown book"}</p>
      <p>
        by{" "}
        <ul>
          {loan.item?.book?.authors?.map((a) => {
            return a != null ? (
              <li key={a.id}>
                {a.firstName} {a.lastName}
              </li>
            ) : null;
          })}
        </ul>
      </p>
    </section>
  );
}
