"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const projects = ["Homepage redesign", "Mobile app", "Marketing site"];
const workTypes = ["Development", "Design", "Research", "QA"];

export function AddEntryDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [project, setProject] = useState(projects[0]);
  const [type, setType] = useState(workTypes[0]);
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("4");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Entry</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4 px-6 py-5"
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="project">
              Select Project <span className="text-red-600">*</span>
            </Label>
            <Select
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              {projects.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="type">
              Type of Work <span className="text-red-600">*</span>
            </Label>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {workTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">
              Task description <span className="text-red-600">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Write a short summary of what you worked on..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="hours">Hours</Label>
            <div className="flex items-center gap-2">
              <Input
                id="hours"
                type="number"
                min={0}
                max={24}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-20"
              />
              <span className="text-sm text-slate-500">hours</span>
            </div>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={() => onOpenChange(false)}>Add entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
