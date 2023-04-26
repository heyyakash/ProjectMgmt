import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SupabaseClient } from "@supabase/supabase-js"

const getInitialProps = async (ctx:any) => {
    const supabase = createServerSupabaseClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()


    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }

    const { data: metadata, error } = await supabase.from("Users").select("*").eq("email", session.user.email)
    if (!error) {

        return {
            props: {
                user: session.user,
                metadata: metadata[0],
            },

        }
    }
}


export default getInitialProps