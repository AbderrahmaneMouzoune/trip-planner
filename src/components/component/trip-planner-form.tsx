"use client"
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { fetchChatGPTResponse } from "@/utils/api"

const formSchema = z.object({
  country: z.string().min(2).max(60),
})

export function TripPlannerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetchChatGPTResponse(values.country)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error("Error submitting form:", error)
      })
  }
  return (
    <Card className="w-[375px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="space-y-2">
            <CardTitle>Weather</CardTitle>
            <CardDescription>
              Enter a country to get the weather.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of the country</FormLabel>
                  <FormControl>
                    <Input placeholder="Thaïlande" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a country to have some recommendation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
