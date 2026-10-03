export type TreeNode = {
  id: string;

  nomComplet: string;

  photo?: string;

  dateNaissance?: string;

  lieuNaissance?: string;

  nationalite?: string;

  ethnie?: string;

  statutVital?: string;
};

export type TreeEdge = {
  type: string;

  from: string;

  to: string;
};

export type TreeResponse = {
  nodes: TreeNode[];

  edges: TreeEdge[];
};