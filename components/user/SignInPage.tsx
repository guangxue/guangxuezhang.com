import GithubSignInButton from "../GithubSignInButton";
import GoogleSignInButton from "../GoogleSignInButton";

function UserSignInPage() {

  return (
    <div className="UserSignInPage flex justify-center items-center w-screen prose prose-neutral prose-h1:text-3xl max-w-none">
      <section className="flex flex-col py-14 px-12 gap-6">
        <h1 className="text-center">Welcome back</h1>
        <GithubSignInButton />
        <GoogleSignInButton />
      </section>
    </div>
  );
}

export default UserSignInPage;
