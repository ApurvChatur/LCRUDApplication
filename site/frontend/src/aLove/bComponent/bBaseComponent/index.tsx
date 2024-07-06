import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"

import { Button } from "@/aLove/bComponent/aShadcnUI/components/ui/button"
import { Label } from "@/aLove/bComponent/aShadcnUI/components/ui/label"
import { Input } from "@/aLove/bComponent/aShadcnUI/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/aLove/bComponent/aShadcnUI/components/ui/table"


const formSchema = z.object({
  aTitle: z
    .string()
    .min(5, "Please enter atleast 5 characters")
    .max(15, "Please enter atmost 15 characters")
})

const BaseComponent = () => {
  const [baseList, setBaseList] = useState<{_id: string, aTitle: string}[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/base/list")
      .then(response => {
        // console.log(response.data)

        if (response.data.success) {
          setBaseList(response.data.list)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // console.log(values)

    axios.post("http://localhost:8080/api/v1/base/create", values)
      .then(response => {
        // console.log(response.data)
        
        if (response.data.success) {
          setBaseList(prevState => [...prevState, response.data.create])
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        form.reset()
      })
  }

  return (
    <div className="bg-rose-950 flex flex-col gap-6 p-6">
      {/* Form */}
      <div className="bg-lime-400 rounded-md p-6" >
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6" >
          <div className="flex flex-col gap-2" >
            <Label>Title</Label>
            <Input
              { ...form.register("aTitle") }
              type="text"
              placeholder="Please enter title..."
            />
            {form.formState.errors.aTitle && (
              <span className="text-sm text-red-600" >
                {form.formState.errors.aTitle.message}
              </span>
            )}
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting} >Submit</Button>
        </form>
      </div>

      {/* List */}
      <div className="bg-cyan-400 rounded-md p-6" >
        <Table>
          <TableCaption>This is the list of Base collection...</TableCaption>
        
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
            </TableRow>
          </TableHeader>
            
          <TableBody>
            {baseList.map((each, index) => (
              <TableRow key={index} >
                <TableCell>{each._id}</TableCell>
                <TableCell>{each.aTitle}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  )
}

export default BaseComponent;
