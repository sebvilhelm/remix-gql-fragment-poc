import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { graphql } from "~/gql";
import { useLoaderData } from "@remix-run/react";
import { Loan } from "~/components/Loan";
import { client } from "~/graphql-client.server";

const UserPageQuery = graphql(`
  query UserPageQuery($userId: ID!) {
    user(id: $userId) {
      id
      email
      loans {
        id
        ...LoanComponent
      }
    }
  }
`);

export async function loader({ params }: LoaderArgs) {
  const userId = params.userId;

  if (userId == null) {
    throw new Error("missing userId");
  }

  const { user } = await client.request(UserPageQuery, {
    userId,
  });

  if (user == null) {
    throw new Response("Not found", { status: 404 });
  }

  return json({ user });
}

export default function UserPage() {
  const data = useLoaderData<typeof loader>();

  const { user } = data;

  return (
    <div>
      <h1>
        {user.email} has {user.loans?.length ?? 0} loans
      </h1>
      <ul>
        {user.loans?.map((loan) =>
          loan != null ? (
            <li key={loan.id}>
              <Loan loan={loan} />
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
