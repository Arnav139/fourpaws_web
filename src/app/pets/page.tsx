import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { petService } from "@/services";
import PetCard from "@/components/pet/PetCard";
import SearchBar from "@/components/common/SearchBar";

export const revalidate = 60; // invalidate every minute

export default async function PetsPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string | undefined }>;
}) {
  const searchQuery = (await searchParams)?.query || "";
  const { data, error } = await petService.getPetForms();

  const petsData = data?.data || [];
  const filteredPets = petsData?.filter((pet) =>
    pet?.name?.startsWith(searchQuery?.trim()),
  );

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="font-comic text-3xl font-black">Pet Profiles</h1>
          <p className="text-muted-foreground">
            Manage pet profiles and registrations.
          </p>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="secondary">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button> */}
          <Link href="/pets/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Pet
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <SearchBar placeholder="Search pets..." />
      </div>

      <Tabs defaultValue="all" className="w-full flex-1 flex flex-col">
        {/* <TabsList className="w-full border-2 border-black rounded-xl h-12 bg-white">
               <TabsTrigger
                 value="all"
                 className="font-bold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                 All Pets
               </TabsTrigger>
               <TabsTrigger
                 value="pending"
                 className="font-bold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                 Pending Approval
               </TabsTrigger>
               <TabsTrigger
                 value="approved"
                 className="font-bold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                 Approved
               </TabsTrigger>
               <TabsTrigger
                 value="rejected"
                 className="font-bold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                 Rejected
               </TabsTrigger>
             </TabsList> */}
        <TabsContent value="all" className="flex-1 flex flex-col">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>All Pet Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPets && filteredPets.length !== 0 ? (
                  filteredPets?.map((pet, index) => (
                    <PetCard pet={pet} key={index} />
                  ))
                ) : error ? (
                  <div className="text-center py-8 text-destructive">
                    {`There was an error loading pet profiles. Please try again later.`}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No pet profiles found
                    {searchQuery ? `for "${searchQuery}"` : ""}.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                No pets waiting for approval
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Pets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                All pets are currently unapproved
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Pets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                No rejected pet profiles
              </p>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
