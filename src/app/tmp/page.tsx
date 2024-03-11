export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server'
 
    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }
 
    console.log('test', formData);
    // mutate data
    // revalidate cache
  }
 
  return (<form action={createInvoice}>
    <input type="text" name="customerId" />
    <input type="text" name="amount" />
    <input type="text" name="status" />
    <button type="submit">Submit</button>
  </form>);
}