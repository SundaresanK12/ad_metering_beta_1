import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Edit, 
  TestTube, 
  Plus, 
  Search, 
  Trash,
  BarChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';

// Mock data for experiments
const initialExperiments = [
  { id: 1, name: 'Price Point Test', status: 'Active', variant: 'A/B', startDate: '2023-07-15', endDate: '2023-08-15', description: 'Testing different price points for the family plan' },
  { id: 2, name: 'Landing Page Layout', status: 'Completed', variant: 'A/B/C', startDate: '2023-05-01', endDate: '2023-06-01', description: 'Testing three different landing page layouts for conversion' },
  { id: 3, name: 'Ad Copy Test', status: 'Planning', variant: 'A/B', startDate: '2023-09-01', endDate: '2023-09-15', description: 'Testing different ad copy for the fall promotion' },
  { id: 4, name: 'Offer Placement', status: 'Active', variant: 'A/B', startDate: '2023-08-01', endDate: '2023-08-31', description: 'Testing different placements of the special offer on the website' },
];

const Experiments = () => {
  const [experiments, setExperiments] = useState(initialExperiments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentExperiment, setCurrentExperiment] = useState<any>(null);
  const [newExperiment, setNewExperiment] = useState({
    name: '',
    status: 'Planning',
    variant: 'A/B',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredExperiments = experiments.filter(experiment =>
    experiment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExperiment = () => {
    const id = Math.max(...experiments.map(e => e.id), 0) + 1;
    setExperiments([...experiments, { id, ...newExperiment }]);
    setNewExperiment({
      name: '',
      status: 'Planning',
      variant: 'A/B',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsAddOpen(false);
    toast.success('Experiment created successfully');
  };

  const handleEditExperiment = () => {
    setExperiments(experiments.map(e => e.id === currentExperiment.id ? currentExperiment : e));
    setIsEditOpen(false);
    toast.success('Experiment updated successfully');
  };

  const handleDeleteExperiment = (id: number) => {
    setExperiments(experiments.filter(e => e.id !== id));
    toast.success('Experiment deleted successfully');
  };

  const openEditSheet = (experiment: any) => {
    setCurrentExperiment(experiment);
    setIsEditOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewExperiment({ ...newExperiment, [name]: value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentExperiment({ ...currentExperiment, [name]: value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MainNavigation />
      
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">A/B Test Experiments</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 w-1/3">
          <Input 
            placeholder="Search experiments" 
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Experiment
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Experiment</SheetTitle>
              <SheetDescription>
                Add details for your new A/B test experiment
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Experiment Name</label>
                <Input 
                  name="name" 
                  value={newExperiment.name} 
                  onChange={handleInputChange} 
                  placeholder="Price Point Test" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <select 
                  name="status"
                  value={newExperiment.status}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Variant Type</label>
                <select 
                  name="variant"
                  value={newExperiment.variant}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="A/B">A/B</option>
                  <option value="A/B/C">A/B/C</option>
                  <option value="Multivariate">Multivariate</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <Input 
                    type="date"
                    name="startDate" 
                    value={newExperiment.startDate} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Input 
                    type="date"
                    name="endDate" 
                    value={newExperiment.endDate} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea 
                  name="description" 
                  value={newExperiment.description} 
                  onChange={handleInputChange} 
                  placeholder="Describe the experiment objectives and details"
                  rows={4}
                />
              </div>
              <Button onClick={handleAddExperiment} className="w-full">
                Create Experiment
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Experiments
          </CardTitle>
          <CardDescription>
            Manage your A/B tests and track their results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your A/B test experiments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExperiments.map((experiment) => (
                <TableRow key={experiment.id}>
                  <TableCell className="font-medium">{experiment.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      experiment.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      experiment.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                      experiment.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                      experiment.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {experiment.status}
                    </span>
                  </TableCell>
                  <TableCell>{experiment.variant}</TableCell>
                  <TableCell>{experiment.startDate}</TableCell>
                  <TableCell>{experiment.endDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditSheet(experiment)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteExperiment(experiment.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Experiment Sheet */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent>
          {currentExperiment && (
            <>
              <SheetHeader>
                <SheetTitle>Edit Experiment</SheetTitle>
                <SheetDescription>
                  Update the details for your experiment
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Experiment Name</label>
                  <Input 
                    name="name" 
                    value={currentExperiment.name} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <select 
                    name="status"
                    value={currentExperiment.status}
                    onChange={handleEditChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Variant Type</label>
                  <select 
                    name="variant"
                    value={currentExperiment.variant}
                    onChange={handleEditChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="A/B">A/B</option>
                    <option value="A/B/C">A/B/C</option>
                    <option value="Multivariate">Multivariate</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Start Date</label>
                    <Input 
                      type="date"
                      name="startDate" 
                      value={currentExperiment.startDate} 
                      onChange={handleEditChange} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">End Date</label>
                    <Input 
                      type="date"
                      name="endDate" 
                      value={currentExperiment.endDate} 
                      onChange={handleEditChange} 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea 
                    name="description" 
                    value={currentExperiment.description} 
                    onChange={handleEditChange} 
                    rows={4}
                  />
                </div>
                <Button onClick={handleEditExperiment} className="w-full">
                  Update Experiment
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Experiments;
